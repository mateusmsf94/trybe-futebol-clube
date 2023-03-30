import { Request, Response } from 'express';
import TeamService from '../services/TeamServie';

export default class TeamController {
  constructor(private teamService: TeamService) { }

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this.teamService.getById(id);

      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching team', error });
    }
  };

  public getAll = async (_: Request, res: Response): Promise<void> => {
    try {
      const teams = await this.teamService.getAll();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teams', error });
    }
  };
}
