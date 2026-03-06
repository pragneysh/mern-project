import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  jwtToken: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ✅ Full Name Getter
  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export default User;
