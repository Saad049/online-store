// routes/cartItemRoutes.ts
import { Router } from 'express';
import { addToCart, getAllCarts, getUserCart } from '../controller/cartItmesController';

const router = Router();
/**
 * @swagger
 * /cartItems/items/add:
 *   post:
 *     summary: Add or update item quantity in user's cart
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - action
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 12
 *               action:
 *                 type: string
 *                 enum: [increment, decrement]
 *                 example: increment
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart updated successfully
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 57
 *                     status:
 *                       type: string
 *                       example: active
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 87
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                           price:
 *                             type: string
 *                             example: "10.00"
 *                           totalPrice:
 *                             type: string
 *                             example: "10.00"
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 12
 *                               name:
 *                                 type: string
 *                                 example: pizza
 *                               description:
 *                                 type: string
 *                                 example: best pizza in the town
 *                               sku:
 *                                 type: string
 *                                 example: cs3-0234
 *                               price:
 *                                 type: string
 *                                 example: "10.00"
 *                               discountedPrice:
 *                                 type: string
 *                                 example: "8.00"
 *                               image:
 *                                 type: string
 *                                 example: image-1747304109016-56107906.jpg
 *                               is_featured:
 *                                 type: boolean
 *                                 example: true
 *                               quantity:
 *                                 type: integer
 *                                 example: 10
 *       400:
 *         description: Invalid user id
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 * 
 */
router.post('/items/add', addToCart);
/**
 * @swagger
 * /cartItems/{id}:
 *   get:
 *     summary: Get a user's cart by user ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user's ID
 *         example: 45
 *     responses:
 *       200:
 *         
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 57
 *                     status:
 *                       type: string
 *                       example: active
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 87
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                           price:
 *                             type: string
 *                             example: "10.00"
 *                           totalPrice:
 *                             type: string
 *                             example: "10.00"
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 12
 *                               name:
 *                                 type: string
 *                                 example: pizza
 *                               description:
 *                                 type: string
 *                                 example: best pizza in the town
 *                               sku:
 *                                 type: string
 *                                 example: cs3-0234
 *                               price:
 *                                 type: string
 *                                 example: "10.00"
 *                               discountedPrice:
 *                                 type: string
 *                                 example: "8.00"
 *                               image:
 *                                 type: string
 *                                 example: image-xyz.jpg
 *                               is_featured:
 *                                 type: boolean
 *                                 example: true
 *                               quantity:
 *                                 type: integer
 *                                 example: 10
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */

router.get('/:id',getUserCart);

/**
 * @swagger
 * /cartItems:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: All cart items
 */

router.get('/', getAllCarts);

export default router;


