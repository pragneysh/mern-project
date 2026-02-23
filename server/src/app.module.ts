import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DynamoDBModule } from './database/dynamodb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, DynamoDBModule, ConfigModule.forRoot({isGlobal: true})], // eslint-disable-line
  controllers: [AppController],
  providers: [AppService],
  exports: [UsersModule, AuthModule, DynamoDBModule],
})
export class AppModule {}
