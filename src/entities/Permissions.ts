import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,  } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  module!: string;


  @Column({ default: false })
  canCreate!: boolean;

  @Column({ default: false })
  canUpdate!: boolean;

  @Column({ default: false })
  canDelete!: boolean;

  @Column({ default: false })
  canGet!: boolean;
     @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[]; 

}