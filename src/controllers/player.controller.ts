import { Request, Response } from 'express';
import PlayerModel from '../models/player.model';

export const getStarPlayersByTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const players = await PlayerModel.find({
      teamId,
      role: 'star',
    }).sort({ name: 1 });

    res.json({
      success: true,
      teamId,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error('getStarPlayersByTeam error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch star players',
    });
  }
};
