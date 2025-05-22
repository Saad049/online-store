
import { Router } from 'express';
import { updateOrderStatus } from '../controller/updateOrderStatus';

const router = Router();
router.patch('/:id/status', updateOrderStatus);

export default router;
