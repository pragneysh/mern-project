import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { DynamoDBModule } from "./database/dynamodb.service";
import { ConfigModule } from "@nestjs/config";
import { MenuModule } from "./menu/menu.module";
import { S3Service } from "./aws/s3.service";
import { AwsModule } from "./aws/aws.module";

@Module({
  imports: [UsersModule, AuthModule, DynamoDBModule, ConfigModule.forRoot({isGlobal: true}), MenuModule, AwsModule], // eslint-disable-line
  controllers: [AppController],
  providers: [AppService, S3Service],
  exports: [UsersModule, AuthModule, DynamoDBModule],
})
export class AppModule {}
