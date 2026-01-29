// src/models/team.model.ts
import { Schema, model} from 'mongoose';

export interface Team {
  _id: string; // เช่น "LOV"
  leagueId: string; // ref League._id
  name: string;
  shortName: string;
  logo: string;
  stars: string[]; // player ids (2 คนหลัก)
}

const TeamSchema = new Schema<Team>(
  {
    _id: { type: String, required: true },
    leagueId: { type: String, ref: 'league', required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    logo: { type: String, required: true },
    // ⚠️ DEPRECATED
    // stars field is no longer used.
    // Star players are derived from Player.role === 'star'
    stars: [{ type: String, ref: 'player' }],
  },
  { timestamps: true }
);

  export const TeamModel = model<Team>('Team', TeamSchema);
