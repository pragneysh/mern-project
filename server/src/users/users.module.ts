// src/users/users.module.ts
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
// import { DynamoDBService } from "../database/dynamodb.service";

@Module({
  providers: [UsersService], // ✅ put it here
  exports: [UsersService], // ✅ export it here
})
export class UsersModule {}
