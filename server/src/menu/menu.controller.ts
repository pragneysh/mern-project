import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("create-category")
  @UseInterceptors(FileInterceptor("image"))
  createCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; description: string },
  ) {
    return this.menuService.create(body, file);
  }

  @Get("categories")
  getAllCategories() {
    return this.menuService.getAllCategories();
  }
}
