import Leaderboard from './LearderBoard';

class HomeLeaderboard extends Leaderboard {
  protected getTotalVictories = (): number => {
    const victories = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return victories;
  };

  protected getTotalDraws = (): number => {
    const draws = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return draws;
  };

  protected getTotalLosses = (): number => {
    const losses = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return losses;
  };

  protected getGoalsFavor = (): number => {
    const goalsFavor = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);

    return goalsFavor;
  };

  protected getGoalsOwn = (): number => {
    const goalsOwn = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);

    return goalsOwn;
  };
}

export default HomeLeaderboard;
