import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from '../users/user.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  OUT_FOR_DELIVERY = 'Out For Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 🔥 Custom Display Order ID (#ORD00001)
  @Column({ unique: true })
  orderNumber: string;

  // ✅ Proper User Relation
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  mobile: string;

  @Column({ type: 'float' })
  subtotal: number;

  @Column({ type: 'float' })
  gst: number;

  @Column({ type: 'float' })
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
