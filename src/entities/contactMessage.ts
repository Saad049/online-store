// entities/ContactMessage.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { User } from './user';
  
  @Entity()
  export class ContactMessage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    firstName!: string;
  
    @Column()
    lastName!: string;
  
    @Column()
    email!: string;
  
    @Column('text')
    message!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => User, (user) => user.ContactMessages, { nullable: true, onDelete: 'SET NULL' })
    user!: User;
  }
  