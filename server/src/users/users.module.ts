// src/users/users.module.ts
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService], // ✅ put it here
  exports: [UsersService], // ✅ export it here
})
export class UsersModule {}
