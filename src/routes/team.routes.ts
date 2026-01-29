import { Router } from 'express';
import { getTeamsByLeague } from '../controllers/team.controller.js';

const router = Router();

/**
 * GET /api/leagues/:leagueId/teams
 */
router.get('/leagues/:leagueId/teams', getTeamsByLeague);

export default router;
