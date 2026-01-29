import { Router } from 'express';
import { getStarPlayersByTeam } from '../controllers/player.controller';

const router = Router();

/**
 * GET /api/teams/:teamId/stars
 */
router.get('/teams/:teamId/stars', getStarPlayersByTeam);

export default router;
