import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../entities/user';
import { Cart } from '../entities/Cart';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItems';
import { Payment } from '../entities/payment';
import { sendOrderConfirmationEmail } from '../utils/mailer';

export const placeOrder = async (req: Request, res: Response) => {
  const { userId, paymentMethod='COD',cardHolderName,deliveryAddress,cardNumber, expiryDate, cvv } = req.body;

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartRepo = AppDataSource.getRepository(Cart);

  
    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, status: 'active' },
      relations: ['items', 'items.product'],
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or does not exist' });
    }

    const deliveryFee = 15;
    const serviceFee = 7;
    const taxRate = 0.1;

    const total = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    const tax = total * taxRate;
    const totalPrice = total + tax + deliveryFee + serviceFee;

    const orderRepo = AppDataSource.getRepository(Order);

    const newOrder = orderRepo.create({
      user,
      total,
      deliveryFee,
      serviceFee,
      tax,
      totalPrice,
      cart,
      paymentMethod,
      trackingNumber:'Null',
      estimatedDeliveryDate:'Null',
      deliveryAddress,
      status: 'pending',
    });

    await orderRepo.save(newOrder);

    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    const orderItems = cart.items.map((cartItem) =>
      orderItemRepo.create({
        order: newOrder,
        product: cartItem.product,
        quantity: cartItem.quantity,
        unitPrice: cartItem.price,

      })
      
    );

    await orderItemRepo.save(orderItems);

    if (paymentMethod === 'card') {
      if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ message: 'Card details are required for card payments' });
      }

         for (const item of cart.items) {
      if (item.product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${item.product.name}. Available: ${item.product.quantity}, Requested: ${item.quantity}`,
        });
      }
    }

      const paymentRepo = AppDataSource.getRepository(Payment);

      const payment = paymentRepo.create({
        order: newOrder,
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        status: 'success',
      });

      await paymentRepo.save(payment);

      newOrder.payment = payment;
      await orderRepo.save(newOrder);
    }
      
    await AppDataSource.getRepository(Cart).save(cart);
 
    cart.status = 'inactive';
    await cartRepo.save(cart);

    const placedOrder = await orderRepo.findOne({
      where: { id: newOrder.id },
      relations: ['items', 'items.product', 'payment', 'user', 'cart'],
    });
    if (!placedOrder) {
  return res.status(404).json({ message: 'Order not found after creation' });
}
    await sendOrderConfirmationEmail(user.email, placedOrder);
    

    return res.status(201).json({
      message: 'Order placed successfully and inventry updadated',
      order: placedOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
