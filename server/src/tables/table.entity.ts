import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

export enum TableShape {
  SQUARE = 'square',
  ROUND = 'round',
  LONG = 'long',
}

export enum TableStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  OCCUPIED = 'occupied',
  INACTIVE = 'inactive',
}

@Entity('restaurant_tables')
export class RestaurantTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  tableNumber: string;

  @Column({ type: 'int', default: 2 })
  capacity: number;

  @Column({
    type: 'enum',
    enum: TableShape,
    default: TableShape.SQUARE,
  })
  shape: TableShape;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'float', default: 0 })
  positionX: number;

  @Column({ type: 'float', default: 0 })
  positionY: number;

  @Column({ type: 'float', default: 0 })
  rotation: number;

  @Column({ type: 'float', default: 1 })
  scale: number;

  @Column({
    type: 'enum',
    enum: TableStatus,
    default: TableStatus.AVAILABLE,
  })
  status: TableStatus;

  @Column({ default: true })
  isActive: boolean;

  // 🔗 One Table → Many Orders
  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
