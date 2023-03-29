import { INTEGER, STRING, Model } from 'sequelize';
import sequelize from '.';

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
    name: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize,
    tableName: 'teams',
  },
);

// Team.hasMany(Match, {
//   foreignKey: 'homeTeamId',
//   as: 'homeMatches',
// });

// Team.hasMany(Match, {
//   foreignKey: 'awayTeamId',
//   as: 'awayMatches',
// });

export default Team;
