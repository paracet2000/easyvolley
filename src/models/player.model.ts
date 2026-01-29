// src/models/player.model.ts
import { Schema, model } from 'mongoose';

export interface Player {
  _id: string;
  name: string;
  teamId: string;
  leagueId: string;
  role: 'star' | 'regular';
  position?: string;
  number?: number;
  nationality?: string;
  photoUrl: string;
}

const playerSchema = new Schema<Player>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },

    teamId: { type: String, required: true, index: true },
    leagueId: { type: String, required: true, index: true },

    role: {
      type: String,
      enum: ['star', 'regular'],
      default: 'regular',
    },

    position: String,
    number: Number,
    nationality: String,

    photoUrl: { type: String},
  },
  {
    collection: 'players',
    timestamps: true,
    strict: 'throw',
  }
);

export default model<Player>('Player', playerSchema);
