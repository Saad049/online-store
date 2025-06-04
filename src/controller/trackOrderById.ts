import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Order } from '../entities/order';


export const trackOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  if (!req.user) {
  return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
}
 
  const orderIdNum = parseInt(orderId);

  if (isNaN(orderIdNum)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const order = await orderRepo.findOne({
      where: { id: orderIdNum },
      relations: ['items', 'items.product','user','payment'],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.id !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized: Not your order' });
    }

    return res.status(200).json({
      message: 'Order found by order id',
      order: {
        id: order.id,
        email: order.user.email,
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        trackingNumber: order.trackingNumber,
        payment:order.payment,
         estimatedDeliveryDate: order.estimatedDeliveryDate,
        items: order.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          
        })),
      },
    });
  } catch (error) {
    console.error('Error tracking order:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const trackOrderByTrackingNumber = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;
  if (!req.user) {
  return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
}

  try {
    const orderRepo = AppDataSource.getRepository(Order);

    const order = await orderRepo.findOne({
      where: { trackingNumber },
      relations: ['user', 'items', 'items.product', 'payment'],
    });
     if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
     if (order.user.id !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized: Not your order' });
    }

    return res.status(200).json({
      message: 'Order found by tracking number',
      order: {
        id: order.id,
        email: order.user.email,
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        trackingNumber: order.trackingNumber,
        payment:order.payment,
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
