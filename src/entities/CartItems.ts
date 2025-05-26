import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product';
import { Cart } from './Cart';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.cartItems,{ onDelete: 'CASCADE' })
  product!: Product;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number; 
}
