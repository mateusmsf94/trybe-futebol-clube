import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

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

// Team.hasMany(Match, {
//   foreignKey: 'homeTeamId',
//   as: 'homeMatches',
// });

// Team.hasMany(Match, {
//   foreignKey: 'awayTeamId',
//   as: 'awayMatches',
// });

export default Team;
