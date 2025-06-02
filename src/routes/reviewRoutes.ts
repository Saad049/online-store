import { Router } from "express";
import { createReview } from "../controller/productReviewController";
import { upload } from "../middleware/uploads";
import { authenticate } from "../middleware/authentic";

const router = Router();

/**
 * @swagger
 * /createReview:
 *   post:
 *     summary: Create a Review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - message
 *               - rating
 *               - image
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 10
 *               message:
 *                 type: string
 *                 example: "I have ordered it many times, it's so delicious. Highly recommended!"
 *               rating:
 *                 type: string
 *                 example: "3"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review created successfully
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 16
 *                     message:
 *                       type: string
 *                       example: I have ordered it many times, it's so delicious. Highly recommended!
 *                     rating:
 *                       type: string
 *                       example: "3"
 *                     image:
 *                       type: string
 *                       example: image-1748253126237-54007306.jpeg
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-26T09:52:06.267Z
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 24
 *                         name:
 *                           type: string
 *                           example: saad riaz
 *                         email:
 *                           type: string
 *                           example: saad321@gmail.com
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-05-16T14:15:07.339Z
 *                     product:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 11
 *                         name:
 *                           type: string
 *                           example: Pizza
 *                         description:
 *                           type: string
 *                           example: Best pizza in the town
 *                         sku:
 *                           type: string
 *                           example: cs1-0234
 *                         price:
 *                           type: string
 *                           example: "10.00"
 *                         discountedPrice:
 *                           type: string
 *                           example: "8.00"
 *                         image:
 *                           type: string
 *                           example: image-pizza-001.jpg
 *                         is_featured:
 *                           type: boolean
 *                           example: true
 *                         quantity:
 *                           type: integer
 *                           example: 10
 *       500:
 *         description: Error creating review
 */


router.post('/',upload.array('image'),authenticate,createReview);
export default router;