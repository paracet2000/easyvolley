import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import leagueRoutes from './routes/league.routes';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';
import thumbnailRoutes from './routes/thumbnail.routes';
import cors from 'cors'

dotenv.config();


const app = express();
app.use(cors()); // 👈 บรรทัดนี้สำคัญมาก
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
