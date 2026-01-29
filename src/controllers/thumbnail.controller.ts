import { Request, Response } from 'express';
import { LeagueModel } from '../models/league.model.js';
import { TeamModel } from '../models/team.model.js';
import PlayerModel from '../models/player.model.js';

export const getTeamThumbnail = async (req: Request, res: Response) => {
  const { leagueId, teamId } = req.query as {
    leagueId?: string;
    teamId?: string;
  };

  if (!leagueId || !teamId) {
    return res.status(400).json({
      success: false,
      message: 'leagueId and teamId are required',
    });
  }

  try {
    const league = await LeagueModel.findOne({_id: leagueId });
    if (!league) {
      return res.status(404).json({
        success: false,
        message: 'League not found',
      });
    }

    const team = await TeamModel.findOne({ _id: teamId, leagueId });
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found in this league',
      });
    }

    const stars = await PlayerModel.find({
      teamId,
      leagueId,
      role: 'star',
    }).sort({ name: 1 });

    res.json({
      success: true,
      league: {
        id: league._id,
        name: league.name,
        logo: league.branding.logo,
        theme: league.branding.theme,
      },
      team: {
        id: team._id,
        name: team.name,
        shortName: team.shortName,
        logo: team.logo,
      },
      stars: stars.map((p) => ({
        id: p._id,
        name: p.name,
        photoUrl: p.photoUrl,
        position: p.position,
        number: p.number,
      })),
    });
  } catch (error) {
    console.error('getTeamThumbnail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team thumbnail',
    });
  }
};
