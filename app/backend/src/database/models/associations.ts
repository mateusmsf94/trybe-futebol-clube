import Team from './TeamsModel';
import Match from './MatchesModel';

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

export { Team, Match };
