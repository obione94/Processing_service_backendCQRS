import { Router } from 'express';
import { users } from '../controllers/usersControllers';

const router = Router();

router.get('/', users);

export default router;