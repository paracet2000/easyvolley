import { Request, Response } from 'express';
import { TeamModel } from '../models/team.model';

export const getTeamsByLeague = async (req: Request, res: Response) => {
  const { leagueId } = req.params;

  try {
    const teams = await TeamModel.find({ leagueId }).sort({ name: 1 });

    res.json({
      success: true,
      leagueId,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error('getTeamsByLeague error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teams',
    });
  }
};
