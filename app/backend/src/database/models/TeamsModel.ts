import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Match from './MatchesModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
  },
);

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Team;
