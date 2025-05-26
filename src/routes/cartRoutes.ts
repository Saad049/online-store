// routes/cartItemRoutes.ts
import { Router } from 'express';

import { createCart } from '../controller/cartController';


const router = Router();
/**
 * @swagger
 * /cart/create:
 *   post:
 *     summary: Create a new cart for a user
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 45
 *     responses:
 *       200:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart created successfully
 *                 cart:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 45
 *                         name:
 *                           type: string
 *                           example: saad Rao
 *                         email:
 *                           type: string
 *                           example: saadrao34@gmail.com
 *                         password:
 *                           type: string
 *                           example: "$2b$10$mcELwRjUNxzWHRZsOwKdgey0YbBZSxhz1.gWtfbshViUMHxxrqX4K"
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-05-22T13:49:26.646Z"
 *                     id:
 *                       type: integer
 *                       example: 59
 *                     status:
 *                       type: string
 *                       example: active
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */


router.post('/create', createCart);

export default router;
