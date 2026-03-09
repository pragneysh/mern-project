import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/user.entity';
import { Item } from 'src/menu/item.entity';
import { RestaurantTable } from 'src/tables/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Item, User, RestaurantTable])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
