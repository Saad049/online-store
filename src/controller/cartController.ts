import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../entities/user';
import { Cart } from '../entities/Cart';

export const createCart = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

  

      const existingCart = await AppDataSource.getRepository(Cart).findOne({
      where: { user: { id: userId }, status: 'active' },
     
    });

    if (existingCart) {
      return res.status(400).json({ message: 'Active Cart already exists for this user' });
      
    }

    const cart = AppDataSource.getRepository(Cart).create({ user });
    const savedCart = await AppDataSource.getRepository(Cart).save(cart);

    return res.status(201).json({
      message: 'Cart created successfully',
      cart: savedCart,
    });

  } catch (error) {
    console.error('Error creating cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
