import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import 'express-async-errors';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.listHomeTeams(req, res));

export default router;
