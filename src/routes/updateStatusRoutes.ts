
import { Router } from 'express';
import { updateOrderStatus } from '../controller/updateOrderStatus';

const router = Router();
/**
 * @swagger
 * /updateStatus/{id}/status:
 *   patch:
 *     summary: Update the status of an order (and send email accordingly)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: shipped
 *     responses:
 *       200:
 *         description: Order status updated and email sent
 *         content:
 *           application/json:
 *             example:
 *               message: Order status updated
 *               order:
 *                 id: 1
 *                 status: shipped
 *                 trackingNumber: TRK-1-A1B2C3
 *                 estimatedDeliveryDate: "2025-05-26T00:00:00.000Z"
 *       400:
 *         description: Invalid order status change
 *         content:
 *           application/json:
 *             examples:
 *               cancelledUpdate:
 *                 summary: Cancelled order cannot be updated
 *                 value:
 *                   message: Cancelled orders cannot be updated
 *               wrongFlow:
 *                 summary: Invalid status flow
 *                 value:
 *                   message: Only pending orders can be shipped
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               message: Order not found
 *       500:
 *         description: Internal server error
 */

router.patch('/:id/status', updateOrderStatus);

export default router;
