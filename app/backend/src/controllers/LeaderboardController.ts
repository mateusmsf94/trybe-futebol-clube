// leaderboardController.ts
import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

class LeaderboardController {
  private leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaderboard = await this.leaderboardService.getAll();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the leaderboard.' });
    }
  };

  public getHome = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaderboard = await this.leaderboardService.getHome();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the home leaderboard.' });
    }
  };

  public getAway = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaderboard = await this.leaderboardService.getAway();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the away leaderboard.' });
    }
  };
}

export default LeaderboardController;
