
import { Request,Response } from "express";
import { AppDataSource } from "../config/db";
import { sendOrderCancelledEmail, sendOrderDeliveredEmail, sendOrderShippedEmail } from "../utils/mailer";
import { orderRepo } from "../repositories";

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;


  try {

   const order = await orderRepo.findOne({
  where: { id: parseInt(id) },
  relations: ['user'], 
});
    

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Cancelled orders cannot be updated' });
    }

    if (status === 'shipped' && order.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be shipped' });
    }

    if (status === 'delivered' && order.status !== 'shipped') {
      return res.status(400).json({ message: 'Only shipped orders can be marked as delivered' });
    }

    if (status === 'cancelled' && order.status === 'delivered') {
      return res.status(400).json({ message: 'Delivered orders cannot be cancelled' });
    }
    if (status === 'shipped') {
        console.log(order.status)
      order.status = "shipped";
      order.trackingNumber = `TRK-${order.id}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      order.estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      
 
      await sendOrderShippedEmail(order.user.email, order);
    }
    if (status === 'delivered') {
  order.status = 'delivered';
  await sendOrderDeliveredEmail(order.user.email, order);
}

if (status === 'cancelled') {
  order.status = 'cancelled';
  await sendOrderCancelledEmail(order.user.email, order);
}
    await orderRepo.save(order);


    return res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Error updating order status:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};