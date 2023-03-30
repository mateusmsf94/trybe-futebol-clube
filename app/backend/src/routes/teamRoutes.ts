import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamServie';
import Team from '../database/models/TeamsModel';

const routerTeam = Router();
const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);

routerTeam.get('/', teamController.getAll);
routerTeam.get('/:id', teamController.getById);

export default routerTeam;
