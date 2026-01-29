// src/models/league.model.ts
import { Schema, model, models } from 'mongoose';

export interface League {
  _id: string; // เช่น "MLV"
  name: string;
  branding: {
    logo: string;
    theme: {
      primary: string;
      accent: string;
    };
  };
}

const LeagueSchema = new Schema<League>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    branding: {
      logo: { type: String, required: true },
      theme: {
        primary: { type: String, required: true },
        accent: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

export const LeagueModel =   model<League>('league', LeagueSchema);
