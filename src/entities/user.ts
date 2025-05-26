import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review,} from "./review";
import { Order } from "./order";
import { ContactMessage } from "./contactMessage";
import { Cart } from "./Cart";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!:number;
  @Column()
  name!:string
 
  @Column()
  email!: string;

  @Column()
  password!: string;
  
  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
  @OneToMany(() => ContactMessage, (contactMessage) => contactMessage.user)
 ContactMessages!: ContactMessage[];

 @OneToMany(() => Cart, (cart) => cart.user)
  cart!: Cart;
  
  
}


 