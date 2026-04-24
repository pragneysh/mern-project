import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private tableService: TablesService) {}

  @Get()
  getTables() {
    return this.tableService.findAll();
  }

  @Post()
  createTable(@Body() body: any) {
    return this.tableService.create(body);
  }

  @Patch(':id/position')
  updatePosition(@Param('id') id: number, @Body() body: any) {
    return this.tableService.updatePosition(body);
  }

  @Patch('/layout')
  updateLayout(@Body() body: any) {
    return this.tableService.updateLayout(body);
  }

  @Delete(':id')
  deleteTable(@Param('id') id: number) {
    return this.tableService.deleteTable(id);
  }
}
