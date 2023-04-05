import Leaderboard from './LearderBoard';

class AwayLeaderboard extends Leaderboard {
  protected getTotalVictories = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  protected getTotalDraws = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  protected getTotalLosses = (): number =>
    this._matches.reduce((acc, cur) => {
      if (
        cur.awayTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

  protected getGoalsFavor = (): number =>
    this._matches.reduce((acc, cur) => {
      if (cur.awayTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);

  protected getGoalsOwn = (): number =>
    this._matches.reduce((acc, cur) => {
      if (cur.awayTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);
}

export default AwayLeaderboard;
