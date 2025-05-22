import { Router } from 'express';
import { authenticate } from '../middleware/authentic';
import { createRecipe, getAllRecipes } from '../controller/recipeController';
import { upload } from '../middleware/uploads';


const router = Router();

router.post('/recipes', upload.array('image'),authenticate, createRecipe);
router.get('/get-recipes',getAllRecipes);

export default router;
