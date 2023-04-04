import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  private _matchModel: ModelStatic<Matches>;
  private _teamModel: ModelStatic<Teams>;

  constructor(matchModel: ModelStatic<Matches>, teamModel: ModelStatic<Teams>) {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public getAllMatches = async (): Promise<Matches[]> => {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: this._teamModel,
          as: 'awayTeam',
        },
        {
          model: this._teamModel,
          as: 'homeTeam',
        },
      ],
    });
    return matches;
  };

  private isTrue = (option: string): boolean => option === 'true';

  public getMatchesByProgress = async (option: string): Promise<Matches[]> => {
    const inProgress = this.isTrue(option);
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: this._teamModel,
          as: 'awayTeam',
        },
        {
          model: this._teamModel,
          as: 'homeTeam',
        },
      ],
      where: { inProgress },
    });

    return matches;
  };

  public setMatchFinished = async (id: number): Promise<void> => {
    await this._matchModel.update({ inProgress: false }, { where: { id } });
  };

  public updateMatchScores = async (
    id: string,
    scoreUpdates: { awayTeamGoals: number; homeTeamGoals: number },
  ): Promise<void> => {
    const { awayTeamGoals, homeTeamGoals } = scoreUpdates;
    await this._matchModel.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id: Number(id) } },
    );
  };

  public addNewMatch = async (newMatch: {
    homeTeamId: number;
    awayTeamId: number;
    date: Date;
  }): Promise<Matches> => {
    const match = await this._matchModel.create({
      ...newMatch,
      inProgress: true,
    });
    return match;
  };
}
