import { Router } from 'express';

import { createRecipe, getAllRecipes } from '../controller/recipeController';
import { upload } from '../middleware/uploads';
import { authenticate } from '../middleware/authentic';


const router = Router();
/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management APIs
 */

/**
 * @swagger
 * /recipes/create-recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Chocolate Cake
 *               description:
 *                 type: string
 *                 example: Delicious chocolate cake
 *               cookingTime:
 *                 type: integer
 *                 example: 45
 *               servings:
 *                 type: integer
 *                 example: 8
 *               ingredients:
 *                 type: string
 *                 description: JSON string array of ingredients [{name, quantity}]
 *                 example: '[{"name":"Flour","quantity":"2 cups"}]'
 *               steps:
 *                 type: string
 *                 description: JSON string array of steps [{stepNumber, description}]
 *                 example: '[{"stepNumber":1,"description":"Mix ingredients"}]'
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload the recipe image file
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating recipe
 */

router.post('/create-recipes', upload.array('image'), authenticate,createRecipe);
/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes with pagination
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of recipes with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 recipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       cookingTime:
 *                         type: integer
 *                       servings:
 *                         type: integer
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             quantity:
 *                               type: string
 *                       steps:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             stepNumber:
 *                               type: integer
 *                             description:
 *                               type: string
 *                       image:
 *                         type: string
 */

router.get('/',getAllRecipes);

export default router;
