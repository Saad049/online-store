import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../entities/user';
import { Cart } from '../entities/Cart';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItems';
import { Payment } from '../entities/payment';
import { sendOrderConfirmationEmail } from '../utils/mailer';
import { Product } from '../entities';

export const placeOrder = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const { paymentMethod, cardHolderName, deliveryAddress, cardNumber, expiryDate, cvv } = req.body;

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);
    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, status: 'active' },
      relations: ['items', 'items.product'],
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or does not exist' });
    }

    // **1. Check stock availability before placing order**
    for (const item of cart.items) {
      if (item.product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Only ${item.product.quantity} units available for ${item.product.name}`,
        });
      }
    }

    // **2. Reduce product stock now**
    for (const item of cart.items) {
      item.product.quantity -= item.quantity;
      await productRepo.save(item.product);
    }

    // Calculate totals
    const deliveryFee = 15;
    const serviceFee = 7;
    const taxRate = 0.1;

    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const tax = total * taxRate;
    const totalPrice = total + tax + deliveryFee + serviceFee;

    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

    const trackingNumber = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

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
      trackingNumber,
      estimatedDeliveryDate,
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

    const paymentRepo = AppDataSource.getRepository(Payment);

    if (paymentMethod === 'card') {
      if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ message: 'Card details are required for card payments' });
      }
    }

    const payment = paymentRepo.create({
      order: newOrder,
      paymentMethod: paymentMethod.toUpperCase(), // 'CARD' or 'COD'
      cardHolderName: cardHolderName || '',
      cardNumber: cardNumber || '',
      expiryDate: expiryDate || '',
      cvv: cvv || '',
      status: 'success',
    });

    await paymentRepo.save(payment);

    // Link payment to order
    newOrder.payment = payment;
    await orderRepo.save(newOrder);

    // Mark cart as inactive (checked out)
    cart.status = 'inactive';
    await cartRepo.save(cart);

    // Fetch order with relations for response and email
    const placedOrder = await orderRepo.findOne({
      where: { id: newOrder.id },
      relations: ['items.product', 'payment', 'user', 'cart'],
    });

    if (!placedOrder) {
      return res.status(404).json({ message: 'Order not found after creation' });
    }

    await sendOrderConfirmationEmail(user.email, placedOrder);

    return res.status(201).json({
      message: 'Order placed successfully and inventory updated',
      order: placedOrder,
    });

  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};