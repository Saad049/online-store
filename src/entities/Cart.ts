// entities/Cart.ts
import { Entity, PrimaryGeneratedColumn, OneToMany,  JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { CartItem } from './CartItems';
import { Order } from './order';



@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user!: User;
   @OneToMany(() => CartItem, (item) => item.cart, { eager: true }) 
  items!: CartItem[];
  @OneToMany(() => Order, (order) => order.cart)
orders!: Order[];

@Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
status!: 'active' | 'inactive';


}
