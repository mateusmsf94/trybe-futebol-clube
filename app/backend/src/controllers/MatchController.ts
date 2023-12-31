import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import CustomError from '../utils/CustomErros';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this._matchesService = matchesService;
  }

  public getAllMatches = async (req: Request, res: Response): Promise<void | Response> => {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      const matches = await this._matchesService.getMatchesByProgress(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await this._matchesService.getAllMatches();
    res.status(200).json(matches);
  };

  public finishMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this._matchesService.setMatchFinished(Number(id));
    res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (
    req: Request<{ id: string }, object, { awayTeamGoals: number; homeTeamGoals: number }>,
    res: Response,
  ): Promise<void> => {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    await this._matchesService.updateMatchScores(id, { awayTeamGoals, homeTeamGoals });
    res.status(200).json({ message: 'Edited' });
  };

  public addMatch = async (
    req: Request<object, object, { homeTeamId: number; awayTeamId: number; date: Date }>,
    res: Response,
  ): Promise<void> => {
    try {
      const newMatch = req.body;
      const result = await this._matchesService.addNewMatch(newMatch);
      res.status(201).json(result);
    } catch (error) {
      const err = error as Error;
      const statusCode = (error as CustomError).statusCode || 500;
      res.status(statusCode).json({ message: err.message });
    }
  };
}
