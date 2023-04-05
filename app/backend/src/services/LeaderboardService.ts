import { ModelStatic } from 'sequelize';
import {
  ILeaderboard,
  ILeaderboardService,
} from '../interfaces';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import Leaderboard from '../database/models/LearderBoard';
import HomeLeaderboard from '../database/models/HomeLeaderboard';
import AwayLeaderboard from '../database/models/AwayLeaderboard';

export default class LeaderboardService implements ILeaderboardService {
  private _teamModel: ModelStatic<Teams>;
  private _matchModel: ModelStatic<Matches>;

  constructor(teamModel: ModelStatic<Teams>, matchModel: ModelStatic<Matches>) {
    this._teamModel = teamModel;
    this._matchModel = matchModel;
  }

  private sortArray = (leaderboardArray: ILeaderboard[]): ILeaderboard[] =>
    leaderboardArray.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }
      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }
      return b.goalsFavor - a.goalsFavor;
    });

  private static toILeaderboard(record: Record<string, unknown>): ILeaderboard {
    return {
      name: record.name as string,
      totalPoints: record.totalPoints as number,
      totalGames: record.totalGames as number,
      totalVictories: record.totalVictories as number,
      totalDraws: record.totalDraws as number,
      totalLosses: record.totalLosses as number,
      goalsFavor: record.goalsFavor as number,
      goalsOwn: record.goalsOwn as number,
      goalsBalance: record.goalsBalance as number,
      efficiency: record.efficiency as number,
    };
  }

  private generateLeaderboard = async (
    LeaderboardClass: typeof Leaderboard | typeof HomeLeaderboard | typeof AwayLeaderboard,
  ): Promise<ILeaderboard[]> => {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll();
    const leaderboard = teams.map((team) => {
      const result = new LeaderboardClass(team, matches);
      return LeaderboardService.toILeaderboard(result.getAll());
    });

    return this.sortArray(leaderboard);
  };

  public getAll = async (): Promise<ILeaderboard[]> =>
    this.generateLeaderboard(Leaderboard);

  public getAway = async (): Promise<ILeaderboard[]> =>
    this.generateLeaderboard(AwayLeaderboard);

  public getHome = async (): Promise<ILeaderboard[]> =>
    this.generateLeaderboard(HomeLeaderboard);
}
