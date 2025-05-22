import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Order } from '../entities/order';

import { sendOrderCancelledEmail, sendOrderDeliveredEmail, sendOrderShippedEmail } from '../utils/mailer';

export const trackOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const orderIdNum = parseInt(orderId);

  if (isNaN(orderIdNum)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const order = await orderRepo.findOne({
      where: { id: orderIdNum },
      relations: ['items', 'items.product', 'payment', 'user',],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order fetched successfully', order });
  } catch (error) {
    console.error('Error tracking order:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const trackOrderByTrackingNumber = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;

  try {
    const orderRepo = AppDataSource.getRepository(Order);

    const order = await orderRepo.findOne({
      where: { trackingNumber },
      relations: ['user', 'items', 'items.product'],
    });
     if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({
      message: 'Order found',
      order: {
        id: order.id,
        customerName: order.user.name,
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        trackingNumber: order.trackingNumber,
         estimatedDeliveryDate: order.estimatedDeliveryDate,
        items: order.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
        })),
      },
    });
  } catch (err) {
    console.error('Error tracking order:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
