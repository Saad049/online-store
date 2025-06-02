import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe
} from '../controller/recipeController';
import { upload } from '../middleware/uploads';
import { authenticate } from '../middleware/authentic';
import { checkPermission } from '../middleware/checkPermission';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Manage cooking recipes
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
 *                 example: Chocolate Fudge Cake
 *               description:
 *                 example: Rich and moist chocolate cake with fudge icing
 *               cookingTime:
 *                 example: 40
 *               servings:
 *                 example: 6
 *               ingredients:
 *                 description: JSON string array of ingredients
 *                 example: '[{"name":"Cocoa Powder","quantity":"1/2 cup"},{"name":"Sugar","quantity":"1 cup"}]'
 *               steps:
 *                 description: JSON string array of steps
 *                 example: '[{"stepNumber":1,"description":"Preheat oven to 180C"},{"stepNumber":2,"description":"Mix dry ingredients"}]'
 *               image:
 *                 type: string
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload one or more images
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/create-recipes',
  upload.array('image'),
  authenticate,
  checkPermission('recipe', 'canCreate'),
  createRecipe
);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes (with pagination)
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 pagination:
 *                   totalItems: 25
 *                   currentPage: 1
 *                   totalPages: 3
 *                 recipes:
 *                   - title: Pancakes
 *                     description: Fluffy pancakes with maple syrup
 *                     cookingTime: 15
 *                     servings: 4
 *                     ingredients:
 *                       - name: Flour
 *                         quantity: 1 cup
 *                       - name: Milk
 *                         quantity: 1 cup
 *                     steps:
 *                       - stepNumber: 1
 *                         description: Mix all ingredients
 *                       - stepNumber: 2
 *                         description: Cook on medium heat
 *                     image: pancake.jpg
 */
router.get('/', getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 9f11a5de-b7b1-4bfc-b89b-26c64823f904
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get(
  '/:id',
  authenticate,
  checkPermission('recipe', 'canGet'),
  getRecipeById
);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 3e3b6e44-a02f-4e0f-9af4-b3288f6f70b9
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 example: Updated Chocolate Cake
 *               description:
 *                 example: Better taste and icing
 *               cookingTime:
 *                 example: 50
 *               servings:
 *                 example: 10
 *               ingredients:
 *                 example: '[{"name":"Eggs","quantity":"3"},{"name":"Butter","quantity":"100g"}]'
 *               steps:
 *                 example: '[{"stepNumber":1,"description":"Beat eggs"},{"stepNumber":2,"description":"Add flour"}]'
 *               image:
 *                 type: string
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Recipe updated
 *       404:
 *         description: Not found
 */
router.put(
  '/:id',
  authenticate,
  checkPermission('recipe', 'canUpdate'),
  upload.array('image'),
  updateRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 16fd2706-8baf-433b-82eb-8c7fada847da
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete(
  '/:id',
  authenticate,
  checkPermission('recipe', 'canDelete'),
  deleteRecipe
);

export default router;
