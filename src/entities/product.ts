// entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './CartItems';
import { Review } from './review';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;
  @Column({ unique: true })
  sku!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

 
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  discountedPrice!: number;

  @Column()
  image!: string;

  @Column({ default: false })
  is_featured!: boolean;
   @Column({ type: 'int', default: 1 })
quantity!: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product,{ cascade: true })
cartItems!: CartItem[];
@OneToMany(() =>Review,(review) => review.product)
review!:Review[];


  


}
