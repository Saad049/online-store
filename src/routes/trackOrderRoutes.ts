// routes/cartItemRoutes.ts
import { Router } from 'express';
import { trackOrderById, trackOrderByTrackingNumber,} from '../controller/trackOrderById';









const router = Router();

// Import or define the placedOrder handler

router.get('/orders/:orderId', trackOrderById);

router.get('/orders/track/:trackingNumber',trackOrderByTrackingNumber);

export default router;


