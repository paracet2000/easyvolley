// src/models/match.model.ts
import { Schema, model, models } from 'mongoose';

export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'finished';

export interface Match {
  _id: string; // เช่น "MLV-2025-01-LOV-SUP"
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;

  startTime: Date;
  venue?: string;

  status: MatchStatus;

  forecast?: {
    homeWinPct?: number;
    awayWinPct?: number;
  };

  result?: {
    homeScore: number;
    awayScore: number;
  };
}

const MatchSchema = new Schema<Match>(
  {
    _id: { type: String, required: true },
    leagueId: { type: String, ref: 'league', required: true },

    homeTeamId: { type: String, ref: 'team', required: true },
    awayTeamId: { type: String, ref: 'team', required: true },

    startTime: { type: Date, required: true },
    venue: { type: String },

    status: {
      type: String,
      enum: ['scheduled', 'live', 'finished'],
      required: true,
    },

    forecast: {
      homeWinPct: Number,
      awayWinPct: Number,
    },

    result: {
      homeScore: Number,
      awayScore: Number,
    },
  },
  { timestamps: true }
);

export const MatchModel =
  models.match || model<Match>('match', MatchSchema);
