import { Request, Response } from 'express';
import { LeagueModel } from '../models/league.model';

/**
 * GET /api/leagues
 */
export const getLeagues = async (req: Request, res: Response) => {
  try {
    const leagues = await LeagueModel.find().sort({ name: 1 });

    res.json({
      success: true,
      count: leagues.length,
      data: leagues,
    });
  } catch (error) {
    console.error('getLeagues error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leagues',
    });
  }
};
