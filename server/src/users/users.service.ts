import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 🔹 Create User
  async create(data: { email: string; password: string; name: string; surname: string }) {
    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Generate JWT
    const jwtToken = jwt.sign({ email: data.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    // ✅ Create entity
    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      surname: data.surname,
      isAdmin: false,
      jwtToken,
    });

    // ✅ Save to DB
    return await this.userRepository.save(user);
  }

  // 🔹 Find By Email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // 🔹 Validate User (for login)
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
