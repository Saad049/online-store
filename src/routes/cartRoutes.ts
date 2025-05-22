// routes/cartItemRoutes.ts
import { Router } from 'express';

import { createCart } from '../controller/cartController';


const router = Router();

router.post('/create', createCart);

export default router;
