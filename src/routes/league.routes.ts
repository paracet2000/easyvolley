import { Router } from 'express';
import { getLeagues } from '../controllers/league.controller.js';

const router = Router();

router.get('/', getLeagues);

export default router;
