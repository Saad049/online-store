import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../entities/user';
import { Cart } from '../entities/Cart';
import { Product } from '../entities/product';
import { CartItem } from '../entities/CartItems';

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, action } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);
    const cartItemRepo = AppDataSource.getRepository(CartItem);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

   
    let cart = await cartRepo.findOne({
      where: { user: { id: userId }, status: 'active' },
      relations: ['items', 'items.product'],
    });

   
    if (!cart) {
      cart = cartRepo.create({ user, status: 'active' });
      cart = await cartRepo.save(cart);
    }

    const product = await productRepo.findOneBy({ id: productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cartItem = cart.items.find(item => item.product.id === product.id);

    if (cartItem) {
      if (action === 'increment') {
        cartItem.quantity += 1;
      } else if (action === 'decrement') {
        cartItem.quantity -= 1;
      }

      if (cartItem.quantity <= 0) {
        await cartItemRepo.remove(cartItem);
      } else {
        cartItem.totalPrice = Number((cartItem.price * cartItem.quantity).toFixed(2));
        await cartItemRepo.save(cartItem);
      }
    } else {
      if (action === 'increment') {
        cartItem = cartItemRepo.create({
          cart,
          product,
          quantity: 1,
          price: product.price,
          totalPrice: Number((product.price * 1).toFixed(2)),
        });
        await cartItemRepo.save(cartItem);
      } else {
        return res.status(400).json({ message: 'Cannot decrement. Item not in cart.' });
      }
    }

    const updatedCart = await cartRepo.findOne({
      where: { id: cart.id },
      relations: ['items', 'items.product'],
    });

    return res.status(200).json({
      message: 'Cart updated successfully',
      cart: updatedCart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


export const getUserCart = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  try {
    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getAllCarts = async (_: Request, res: Response) => {
  try {
    const carts = await AppDataSource.getRepository(Cart).find({
      relations: ['user', 'items', 'items.product'],
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'No carts found' });
    }

    return res.status(200).json({
      message: 'All carts fetched successfully',
      carts,
    });
  } catch (error) {
    console.error('Get all carts error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
