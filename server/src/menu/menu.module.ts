import { Module } from "@nestjs/common";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { AwsModule } from "src/aws/aws.module";
// import { dynamoDBProvider } from "../dynamodb.provider";

@Module({
  imports: [AwsModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
