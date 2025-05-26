import { Request, Response } from 'express';
import { productRepo, reviewRepo, userRepository } from '../repositories';
import { AppDataSource } from '../config/db';
import { OrderItem } from '../entities';



export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, productId, message, rating,} = req.body;
    const files = req.files as Express.Multer.File[];
      const imageFilename = files && files[0] ? files[0].filename : "";


    if (!userId || !productId || !message || !rating) {
      return res.status(400).json({ message: 'userId, productId, message and rating are required' });
    }
    
    
  

  
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

   

    const user = await userRepository.findOneBy({ id: userId });
    const product = await productRepo.findOneBy({ id: productId });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const orderItemRepo = AppDataSource.getRepository(OrderItem);
    const purchasedItem = await orderItemRepo
      .createQueryBuilder("orderItem")
      .leftJoin("orderItem.order", "order")
      .where("order.userId = :userId", { userId })
      .andWhere("orderItem.productId = :productId", { productId })
      .andWhere("order.status = :status", { status: "delivered" })
      .getOne();

    if (!purchasedItem) {
      return res.status(403).json({ message: 'Only users with a delivered order can leave a review' });
    }

    const newReview = reviewRepo.create({
      user,
      product,
      message,
      rating,
       image: imageFilename,
    });

    await reviewRepo.save(newReview);

    return res.status(201).json({ message: 'Review created successfully', review: newReview });

  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
