// entities/RecipeIngredient.ts
import {Entity,PrimaryGeneratedColumn,Column, ManyToOne,} from 'typeorm';
import { Recipe } from './recipe';
 
  
  @Entity()
  export class RecipeIngredient {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { onDelete: 'CASCADE' })
    recipe!: Recipe;
  
    @Column()
    name!: string;
  
    @Column()
    quantity!: string;
  }
  