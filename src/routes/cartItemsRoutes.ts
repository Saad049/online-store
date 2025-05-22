// routes/cartItemRoutes.ts
import { Router } from 'express';
import { addToCart, getAllCarts, getUserCart } from '../controller/cartItmesController';


const router = Router();

router.post('/items/add', addToCart);
router.get('/:id',getUserCart);
router.get('/', getAllCarts);

export default router;
