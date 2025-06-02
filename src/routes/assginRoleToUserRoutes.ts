import { Router } from 'express';
import { assignRoleToUser } from '../controller/assginRoleToUser';


const router = Router();
router.post('/role/users',assignRoleToUser)

export default router;