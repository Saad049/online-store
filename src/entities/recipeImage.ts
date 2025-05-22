import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './recipe';


@Entity()
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  filename!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.images)
  recipe!: Recipe;  // Linking the image to a specific recipe
}
