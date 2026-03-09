import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantTable } from './table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(RestaurantTable)
    private tableRepository: Repository<RestaurantTable>,
  ) {}

  // Get all tables
  async findAll(): Promise<RestaurantTable[]> {
    return this.tableRepository.find({
      order: { id: 'ASC' },
    });
  }

  // Create table
  async create(body: any): Promise<RestaurantTable> {
    console.log(body);
    const table = this.tableRepository.create({
      tableNumber: body.tableNumber,
      capacity: body.capacity,
      shape: body.shape,
      imageUrl: body.imageUrl ?? null,
      positionX: body.positionX ?? 100,
      positionY: body.positionY ?? 100,
      isActive: body.isActive ?? true,
    });

    return await this.tableRepository.save(table);
  }

  // Update table info
  async updateTable(id: number, body: Partial<RestaurantTable>): Promise<RestaurantTable> {
    const table = await this.tableRepository.findOne({ where: { id } });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    Object.assign(table, body);

    return this.tableRepository.save(table);
  }

  // Update table position
  async updatePosition(body: any) {
    const tables = Array.isArray(body) ? body : [body];

    return Promise.all(
      tables.map(async (item) => {
        const table = await this.tableRepository.findOne({
          where: { tableNumber: item.tableNumber },
        });

        if (!table) {
          throw new NotFoundException(`Table ${item.tableNumber} not found`);
        }

        table.capacity = item.capacity;
        table.isActive = item.isActive;
        table.positionX = item.positionX;
        table.positionY = item.positionY;

        return this.tableRepository.save(table);
      }),
    );
  }

  // Update table layout
  async updateLayout(body: any) {
    const tables = body.tables;

    // console.log(tables);
    return Promise.all(
      tables.map(async (item) => {
        const table = await this.tableRepository.findOne({
          where: { id: item.id },
        });
        console.log(table);
        if (!table) {
          throw new NotFoundException(`Table ${item.tableNumber} not found`);
        }

        table.capacity = item.capacity;
        table.isActive = item.isActive;
        table.positionX = item.x;
        table.positionY = item.y;

        return this.tableRepository.save(table);
      }),
    );
  }

  // Delete table
  async deleteTable(id: number) {
    const table = await this.tableRepository.findOne({ where: { id } });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.tableRepository.remove(table);

    return {
      message: 'Table deleted successfully',
    };
  }
}
