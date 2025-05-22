// entities/Testimonial.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @Column('text')
  message!: string;

  @Column({ type: 'int' })
  rating!: number;

  @CreateDateColumn()
  created_at!: Date;
}
