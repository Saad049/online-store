import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Order } from "./order";



@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Order, (order) => order.payment)
  order!: Order;

  @Column()
  cardHolderName!: string;

  @Column()
  cardNumber!: string; 

  @Column()
  expiryDate!: string; 

  @Column()
  cvv!: string;

  @Column({ type: 'enum', enum: ['success', 'failed'], default: 'success' })
  status!: 'success' | 'failed';

  @CreateDateColumn()
  createdAt!: Date;
}