// routes/cartItemRoutes.ts
import { Router } from 'express';
import { trackOrderById, trackOrderByTrackingNumber,} from '../controller/trackOrderById';
import { authenticate } from '../middleware/authentic';









const router = Router();

/**
 * @swagger
 * /trackOrder/{orderId}:
 *   get:
 *     summary: Track order by Order ID 
 *     tags: [Track Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */


router.get('/:orderId',authenticate, trackOrderById);
/**
 * @swagger
 * /trackorder/orders/track/{trackingNumber}:
 *   get:
 *     summary: Track order by Tracking Number
 *     tags: [Track Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Tracking number of the order
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */


router.get('/orders/track/:trackingNumber',authenticate,trackOrderByTrackingNumber);

export default router;


