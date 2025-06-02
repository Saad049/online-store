import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,

} from "typeorm"

import { User } from "./user";
import { Permission } from "./Permissions";
@Entity()
export class Role {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()  
  permissions!: Permission[];



  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}