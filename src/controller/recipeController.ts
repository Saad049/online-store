import { Request, Response } from 'express';
import { Recipe } from '../entities/recipe';
import { RecipeIngredient } from '../entities/recipeIngredient';
import { RecipeStep } from '../entities/recipeStep';
import { AppDataSource } from '../config/db';
import { User } from '../entities/user';
import { RecipeImage } from '../entities/recipeImage';


export const createRecipe = async (req: Request, res: Response) => {
    try {
      const decodedUser = req.user;
      if (!decodedUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: decodedUser.userId,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { title, description, cookingTime, servings, ingredients, steps } =
        req.body;
      const files = req.files as Express.Multer.File[];
  
      const imageFilename = files && files[0] ? files[0].filename : "";
  
 
      const newRecipe = new Recipe();
      newRecipe.title = title;
      newRecipe.description = description;
      newRecipe.cookingTime = cookingTime;
      newRecipe.servings = servings;
      newRecipe.image = imageFilename;
    
  
      const savedRecipe = await AppDataSource.getRepository(Recipe).save(
        newRecipe
      );
  
     
      const ingredientArray = ingredients ? JSON.parse(ingredients) : [];
      const ingredientsMapped = ingredientArray.map((ing: any) => {
        const ingredient = new RecipeIngredient();
        ingredient.name = ing.name;
        ingredient.quantity = ing.quantity;
        ingredient.recipe = savedRecipe;
        return ingredient;
      });
  
      await AppDataSource.getRepository(RecipeIngredient).save(ingredientsMapped);
  
 
      const stepArray = steps ? JSON.parse(steps) : [];
      const stepsMapped = stepArray.map((st: any) => {
        const step = new RecipeStep();
        step.stepNumber = st.stepNumber;
        step.description = st.description;
        step.recipe = savedRecipe;
        return step;
      });
  
      await AppDataSource.getRepository(RecipeStep).save(stepsMapped);
  
      
      if (imageFilename) {
        const image = new RecipeImage();
        image.filename = imageFilename;
        image.recipe = savedRecipe;
        await AppDataSource.getRepository(RecipeImage).save(image);
      }
  
      res.status(201).json({
        message: "Recipe created successfully",
        recipe: savedRecipe,
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Error creating recipe" });
    }
  };
  
 export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
          const [recipes, totalItems] = await AppDataSource.getRepository(Recipe).findAndCount({
            relations: {
                ingredients: true,
                steps: true,
                images: true,
         
              },
                skip,
                take: limit,
              });

      
      
      
     
      const formatedRecipes = recipes.map((recipe) => ({
        title:recipe.title,
        description:recipe.description,
        cookingTime:recipe.cookingTime,
        servings:recipe.servings,
        ingredients:recipe.ingredients,
        steps:recipe.steps,
        image:recipe.image

       
      }));
  
      const paginationResponse = {
        pagination:{
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),

        },
            recipes: formatedRecipes,
        
       
      };
  
   
      res.json(paginationResponse);
    }

  
      
     catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Error fetching recipes" });
    }
  }; 
  
  
  
  
 export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }
    
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const recipe = await recipeRepo.findOneBy({ id });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

  export const updateRecipe = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, description, cookingTime, servings, ingredients, steps } = req.body;
    const files = req.files as Express.Multer.File[];
  
    try {
      const recipeRepo = AppDataSource.getRepository(Recipe);
      const recipe = await recipeRepo.findOneBy({ id });
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Update recipe properties
      recipe.title = title || recipe.title;
      recipe.description = description || recipe.description;
      recipe.cookingTime = cookingTime || recipe.cookingTime;
      recipe.servings = servings || recipe.servings;
  
      // Update image if a new one is provided
      if (files && files[0]) {
        recipe.image = files[0].filename; // Save new image filename
      }
  
      // Update ingredients
      if (ingredients) {
        const ingredientArray = JSON.parse(ingredients);
        const ingredientsMapped = ingredientArray.map((ing: any) => {
          const ingredient = new RecipeIngredient();
          ingredient.name = ing.name;
          ingredient.quantity = ing.quantity;
          return ingredient;
        });
        recipe.ingredients = ingredientsMapped;
      }
  
      // Update steps
      if (steps) {
        const stepArray = JSON.parse(steps);
        const stepsMapped = stepArray.map((st: any) => {
          const step = new RecipeStep();
          step.stepNumber = st.stepNumber;
          step.description = st.description;
          return step;
        });
        recipe.steps = stepsMapped;
      }
  
      // Save updated recipe to the database
      await recipeRepo.save(recipe);
  
      res.status(200).json({ message: 'Recipe updated successfully', recipe });
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ message: 'Error updating recipe' });
    }
  };
  export const deleteRecipe = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
  
    try {
      const recipeRepo = AppDataSource.getRepository(Recipe);
      const recipe = await recipeRepo.findOneBy({ id });
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Delete the recipe
      await recipeRepo.remove(recipe);
  
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ message: 'Error deleting recipe' });
    }
  };

