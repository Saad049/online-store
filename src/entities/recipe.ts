// entities/Recipe.ts
import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany} from 'typeorm';
import { RecipeIngredient } from './recipeIngredient';
import { RecipeStep } from './recipeStep';
import { RecipeImage } from './recipeImage';


@Entity()
  export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    title!: string;
  
    @Column()
    description!: string;
  
    @Column()
    image!: string;
  
    @Column()
    cookingTime!: string;
  
    @Column()
    servings!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @OneToMany(() => RecipeIngredient, (ingredient) => ingredient.recipe)
    ingredients!: RecipeIngredient[];
  
    @OneToMany(() => RecipeStep, (step) => step.recipe)
    steps!: RecipeStep[];

  @OneToMany(() => RecipeImage, (image) => image.recipe)  
  images!: RecipeImage[];
  }
  