import { Router } from 'express';
import { getTeamThumbnail } from '../controllers/thumbnail.controller';

const router = Router();

/**
 * GET /api/team-thumbnail
 * ?leagueId=MLV&teamId=ORL
 */
router.get('/team-thumbnail', getTeamThumbnail);

export default router;
