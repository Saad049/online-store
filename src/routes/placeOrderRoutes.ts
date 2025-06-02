// routes/cartItemRoutes.ts
import { Router } from 'express';
import { placeOrder } from '../controller/placeOrderController';
import { authenticate } from '../middleware/authentic';

const router = Router();

/**
 * @swagger
 * /order/items/place:
 *   post:
 *     summary: Place an order with cod and card
 *     tags: [place an order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - paymentMethod
 *               - deliveryAddress
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 42
 *               paymentMethod:
 *                 type: string
 *                 enum: [card, COD]
 *                 example: card
 *               cardHolderName:
 *                 type: string
 *                 example: Saad Riaz
 *               cardNumber:
 *                 type: string
 *                 example: 4111111111111111
 *               expiryDate:
 *                 type: string
 *                 example: 12/27
 *               cvv:
 *                 type: string
 *                 example: 123
 *               deliveryAddress:
 *                 type: string
 *                 example: 123 Street, new muslim Town, Lahore
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Card details are required for card payments
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Server error
 */



router.post('/items/place',authenticate,placeOrder);

export default router;
