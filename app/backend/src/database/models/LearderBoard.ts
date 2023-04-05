import { ITeam, IMatch } from '../../interfaces';

class Leaderboard {
  protected _name: string;
  protected _totalGames: number;
  protected _totalPoints: number;
  protected _totalVictories: number;
  protected _totalDraws: number;
  protected _totalLosses: number;
  protected _goalsFavor: number;
  protected _goalsOwn: number;
  protected _goalsBalance: number;
  protected _efficiency: number;
  protected _team: ITeam;
  protected _matches: IMatch[];

  constructor(team: ITeam, matches: IMatch[]) {
    this._matches = matches;
    this._team = team;
    this._name = this._team.teamName;
    this._totalVictories = this.calculateTotalVictories();
    this._totalDraws = this.calculateTotalDraws();
    this._totalLosses = this.calculateTotalLosses();
    this._totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;
    this._goalsFavor = this.calculategoalsFavor();
    this._goalsOwn = this.calculategoalsOwn();
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = Number(this.calculateEfficiency().toFixed(2));
  }

  private calculateTotalVictories = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private calculateTotalDraws = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private calculateTotalLosses = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private calculategoalsFavor = (): number =>
    this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.homeTeamGoals;
      }
      if (cur.awayTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);

  private calculategoalsOwn = (): number =>
    this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.awayTeamGoals;
      }
      if (cur.awayTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);

  private calculateEfficiency = (): number => {
    const divisor = this._totalGames * 3;
    const division = this._totalPoints / divisor;
    const efficiency = division * 100;

    return efficiency;
  };

  public getAll = (): Record<string, unknown> => {
    const leaderboardTable = {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };

    return leaderboardTable;
  };
}

export default Leaderboard;
