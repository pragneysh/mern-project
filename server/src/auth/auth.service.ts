import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../users/interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    surname: string,
  ): Promise<User> {
    if (password !== confirmPassword) {
      throw new UnauthorizedException("Passwords do not match");
    }

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser !== null) {
      throw new UnauthorizedException("Email already exists");
    }

    if (password.length < 8) {
      throw new UnauthorizedException("Password must be at least 8 characters");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
      surname,
    });

    return user;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) { // eslint-disable-line
      throw new UnauthorizedException("Invalid credentials, please try again.");
    }

    const payload = { email: user.email, sub: user.id }; // eslint-disable-line

    const access_token = this.jwtService.sign(payload); // correct

    const { password: _, ...userWithoutPassword } = user;  // eslint-disable-line

    return {
      user: userWithoutPassword,
      access_token,
    };
  }
}
