import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ================= REGISTER =================
  async register(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    surname: string,
  ): Promise<Omit<User, 'password'>> {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (trimmedPassword !== trimmedConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    if (trimmedPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const existingUser = await this.usersService.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // 🔑 Hash the password BEFORE saving
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const user = await this.usersService.create({
      email: normalizedEmail,
      password: hashedPassword, // ✅ store hashed password
      name,
      surname,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      fullName: `${user.name} ${user.surname}`,
    };
  }

  // ================= LOGIN =================
  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // 🔍 Fetch user WITH password field
    const user = await this.usersService.findByEmail(normalizedEmail, true);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new UnauthorizedException('Password not found for user');
    }

    // 🔑 Compare plain password with hashed password
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token,
    };
  }
}
