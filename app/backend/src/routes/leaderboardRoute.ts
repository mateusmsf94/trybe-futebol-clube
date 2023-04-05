// leaderboardRoutes.ts
import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService(Teams, Matches);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/', leaderboardController.getAll);
leaderboardRouter.get('/away', leaderboardController.getAway);
leaderboardRouter.get('/home', leaderboardController.getHome);

export default leaderboardRouter;
