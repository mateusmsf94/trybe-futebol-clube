import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';

export default class TeamService {
  private teamModel: ModelStatic<Team>;
  constructor(model: ModelStatic<Team>) {
    this.teamModel = model;
  }

  public async getById(id: string): Promise<Team | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }

  public async getAll(): Promise<Team[] | null> {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
