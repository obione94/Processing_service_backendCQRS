import { Router } from 'express';
import { events, create } from '../controllers/eventsControllers';

const router = Router();

router.get('/all', events);
router.get('/create', create);

export default router;