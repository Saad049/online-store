// entities/Testimonial.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

 @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
user!: User;
@ManyToOne(() => Product, (product) => product.review)
product!: Product;

  @Column('text')
  message!: string;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ nullable: true })
image?: string;

  @CreateDateColumn()
  created_at!: Date;
}
