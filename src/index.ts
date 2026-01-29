import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import leagueRoutes from './routes/league.routes.js';
import teamRoutes from './routes/team.routes.js';
import playerRoutes from './routes/player.routes.js';
import thumbnailRoutes from './routes/thumbnail.routes.js';
import cors from 'cors'

dotenv.config();


const app = express();
app.use(cors()); // 👈 บรรทัดนี้สำคัญมาก
app.use(express.static(path.join(process.cwd(), "public")));
const PORT = 3000;

connectDB();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'easyvolley-api-add mongodb' });
});
app.use('/api', teamRoutes);
app.use('/api', playerRoutes);
app.use('/api', thumbnailRoutes);
app.use('/api/leagues', leagueRoutes);


app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
