import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Order } from "./order";



@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Order, (order) => order.payment)
  order!: Order;

  @Column({ nullable: true })
  cardHolderName?: string;

  @Column({ nullable: true })
  cardNumber?: string;

  @Column({ nullable: true })
  expiryDate?: string;

  @Column({ nullable: true })
  cvv?: string;

  @Column({ type: 'enum', enum: ['success', 'failed'], default: 'success' })
  status!: 'success' | 'failed';
    @Column({ type: 'enum', enum: ['CARD', 'COD'], default: 'COD' })
  paymentMethod!: 'CARD' | 'COD'; // ✅ this must match exactly

  @CreateDateColumn()
  createdAt!: Date;
}