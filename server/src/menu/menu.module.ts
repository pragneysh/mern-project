import { Module } from "@nestjs/common";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { AwsModule } from "src/aws/aws.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Item } from "./item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Item]), AwsModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
