import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import CustomError from '../utils/CustomErros';

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

  private async validateNewMatch(newMatch: {
    homeTeamId: number;
    awayTeamId: number;
  }): Promise<void> {
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      throw new CustomError(422, 'It is not possible to create a match with two equal teams');
    }

    const [homeTeam, awayTeam] = await Promise.all([
      this._teamModel.findByPk(newMatch.homeTeamId),
      this._teamModel.findByPk(newMatch.awayTeamId),
    ]);

    if (!homeTeam || !awayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
  }

  public addNewMatch = async (newMatch: {
    homeTeamId: number;
    awayTeamId: number;
    date: Date;
  }): Promise<Matches> => {
    await this.validateNewMatch(newMatch);
    const match = await this._matchModel.create({ ...newMatch, inProgress: true });
    return match;
  };
}
