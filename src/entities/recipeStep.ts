// entities/RecipeStep.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
import { Recipe } from './recipe';
  
  
  @Entity()
  export class RecipeStep {
    @PrimaryGeneratedColumn()
    id!: string;
  
    @ManyToOne(() => Recipe, (recipe) => recipe.steps, { onDelete: 'CASCADE' })
    recipe!: Recipe;
  
    @Column()
    stepNumber!: number;
  
    @Column('text')
    description!: string;
  }
  