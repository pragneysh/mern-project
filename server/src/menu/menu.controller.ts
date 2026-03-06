import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create-category')
  @UseInterceptors(FileInterceptor('image'))
  createCategory(@UploadedFile() file: Express.Multer.File, @Body() body: { name: string; description: string }) {
    return this.menuService.createCategory(body, file);
  }

  @Get('categories')
  getAllCategories() {
    return this.menuService.getAllCategories();
  }

  @Put('update-category/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateCategory(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; description: string },
  ) {
    return this.menuService.updateCategory(id, body, file);
  }

  @Delete('delete-category/:id')
  deleteCategory(@Param('id') id: string) {
    return this.menuService.deleteCategory(id);
  }

  /**
   * Start API for menu item
   */

  @Post('create-menu-item')
  @UseInterceptors(FileInterceptor('image'))
  createMenuItem(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.menuService.createMenuItem(body, file);
  }

  @Get('menu-items')
  getAllMenuItems() {
    return this.menuService.getAllMenuItems();
  }

  @Get('categories/:id/items')
  getCategoryMenuItems(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.menuService.getCategoryMenuItems(id);
  }

  @Get('menu-item/:id')
  getMenuItem(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.menuService.getMenuItem(id);
  }

  @Put('menu-item/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateMenuItem(@Param('id') id: string, @Body() body: any, @UploadedFile() file?: Express.Multer.File) {
    return this.menuService.updateMenuItem(id, body, file);
  }

  @Delete('menu-item/:id')
  deleteMenuItem(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.menuService.deleteMenuItem(id);
  }

  // @Get("uplode")
  // seedMenuItemsFromStaticFile() {
  //   return this.menuService.seedMenuItemsFromStaticFile();
  // }
}
