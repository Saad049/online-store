// entities/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { OrderItem } from './orderItems';
import { Payment } from './payment';
import { Cart } from './Cart';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToOne(() => Cart)
  @JoinColumn() 
  cart!: Cart;
  

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;
  @Column('decimal', { precision: 10, scale: 2 })
  deliveryFee!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  serviceFee!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tax!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;
  
  @Column()  // required, cannot be null
  deliveryAddress!: string;

  @Column({ type: 'enum', enum: ['COD', 'card'], default: 'COD' })
  paymentMethod!: 'COD' | 'card';

  @Column({ type: 'enum', enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  status!: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @CreateDateColumn()
  created_at!: Date;
  @Column({ nullable: true })
estimatedDeliveryDate?: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];
  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
    @JoinColumn() 
payment!: Payment;
@Column({ type: 'varchar', nullable: true })
trackingNumber?: string;


}
