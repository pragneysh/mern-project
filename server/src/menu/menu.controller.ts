import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Put,
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

  @Put("update-category/:id")
  @UseInterceptors(FileInterceptor("image"))
  updateCategory(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; description: string },
  ) {
    return this.menuService.updateCategory(id, body, file);
  }

  @Delete("delete-category/:id")
  deleteCategory(@Param("id") id: string) {
    return this.menuService.deleteCategory(id);
  }
}
