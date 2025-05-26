
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';



@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items,{
    onDelete: 'CASCADE' 
  })
  order!: Order;

  @ManyToOne(() => Product,{
    onDelete: 'CASCADE' 
  })
  product!: Product;

  @Column()
  quantity!: number;
  
  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice!: number;
}
