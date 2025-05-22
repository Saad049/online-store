// routes/cartItemRoutes.ts
import { Router } from 'express';
import { placeOrder } from '../controller/placeOrderController';

const router = Router();


router.post('/items/place', placeOrder);

export default router;
