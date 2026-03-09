import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order.entity';
import { Item } from '../menu/item.entity';
import { User } from '../users/user.entity';
import { RestaurantTable } from '../tables/table.entity';

// ✅ DTOs for type safety
interface CartItemDTO {
  id: string;
  quantity: number;
}

interface CartDTO {
  subtotal: number;
  gst: number;
  total: number;
}

interface ConfirmOrderDTO {
  items: CartItemDTO[];
  mobile: string;
  cart: CartDTO;
  tableNumber: string;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(RestaurantTable)
    private readonly tableRepo: Repository<RestaurantTable>,
  ) {}

  async confirmOrder(body: ConfirmOrderDTO, userId: string) {
    const { items, mobile, cart, tableNumber } = body;

    // ================= Validate Request =================
    if (!mobile || !cart || !items || items.length === 0 || tableNumber === null) {
      throw new BadRequestException('Invalid order data');
    }

    // ================= Find Table =================
    const table = await this.tableRepo.findOne({ where: { tableNumber: tableNumber } });
    if (!table) throw new NotFoundException('Table not found');

    // ================= Find User =================
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    // ================= Generate Order Number =================
    const orderCount = await this.orderRepo.count();
    const orderNumber = `#ORD${(orderCount + 1).toString().padStart(5, '0')}`;

    // ================= Create Order =================
    const order = this.orderRepo.create({
      orderNumber,
      user,
      mobile,
      subtotal: cart.subtotal,
      gst: cart.gst,
      total: cart.total,
      table: table,
    });

    let savedOrder: Order;
    try {
      savedOrder = await this.orderRepo.save(order);
    } catch (err) {
      console.error('Error saving order:', err);
      throw new InternalServerErrorException('Failed to create order');
    }

    // ================= Fetch Items from DB =================
    const itemIds = items.map((i) => i.id);
    const dbItems = await this.itemRepo.find({ where: { id: In(itemIds) } });

    if (!dbItems || dbItems.length === 0) {
      throw new BadRequestException('Items not found in database');
    }

    // ================= Create Order Items =================
    const orderItems: OrderItem[] = items
      .map((itemData) => {
        const dbItem = dbItems.find((d) => d.id === itemData.id);
        if (!dbItem) return null;

        return this.orderItemRepo.create({
          order: savedOrder,
          item: dbItem,
          quantity: itemData.quantity,
          price: dbItem.price,
          total: dbItem.price * itemData.quantity,
        });
      })
      .filter(Boolean) as OrderItem[];

    if (orderItems.length === 0) {
      throw new BadRequestException('No valid items to save');
    }

    try {
      await this.orderItemRepo.save(orderItems);
    } catch (err) {
      console.error('Error saving order items:', err);
      throw new InternalServerErrorException('Failed to save order items');
    }

    return {
      success: true,
      message: 'Order confirmed successfully',
      orderId: savedOrder.id,
      orderNumber: savedOrder.orderNumber,
    };
  }

  async getOrders(user: any) {
    try {
      let orders;
      const dbUser = await this.userRepo.findOne({ where: { id: user } }); //eslint-disable-line

      if (!dbUser) {
        throw new NotFoundException('User not found');
      }
      if (dbUser.isAdmin === true) {
        // eslint-disable-line
        // ✅ Admin gets all orders
        orders = await this.orderRepo.find({
          relations: ['items', 'items.item', 'user'],
          order: {
            createdAt: 'DESC',
          },
        });
      } else {
        // ✅ Normal user gets only their orders
        orders = await this.orderRepo.find({
          where: { user: { id: dbUser.id } }, // eslint-disable-line
          relations: ['items', 'items.item', 'user'],
          order: {
            createdAt: 'DESC',
          },
        });
      }

      return orders; // eslint-disable-line
    } catch (err) {
      console.error('Error fetching orders:', err);
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async changeOrderStatus(orderId: string, body: any) {
    try {
      const order = await this.orderRepo.findOne({
        where: { id: orderId },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }
      order.status = OrderStatus[body.status]; // eslint-disable-line

      await this.orderRepo.save(order);

      return {
        success: true,
        message: 'Order status updated successfully',
        data: order,
      };
    } catch (err) {
      console.error('Error updating order status:', err);
      throw new InternalServerErrorException('Failed to update order status');
    }
  }
}
