import { Router } from 'express';
import MatchesController from '../controllers/MatchController';
import MatchesService from '../services/MatchesService';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import validateToken from '../middlewares/tokenValidaton';

const matchesService = new MatchesService(Matches, Teams);
const matchesController = new MatchesController(matchesService);

const MatchesRouter = Router();

MatchesRouter.get('/', matchesController.getAllMatches);
MatchesRouter.post('/', validateToken, matchesController.addMatch);
MatchesRouter.patch('/:id/finish', validateToken, matchesController.finishMatch);
MatchesRouter.patch('/:id', validateToken, matchesController.updateMatch);

export default MatchesRouter;
