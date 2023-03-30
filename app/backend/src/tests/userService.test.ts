import { expect } from "chai";
import * as sinon from 'sinon';
import TeamService from '../services/TeamServie'
import { ModelStatic } from 'sequelize'
import Team from "../database/models/TeamsModel";

describe('TeamService', () => {
  let teamService: TeamService;
  let teamModelMock: ModelStatic<Team>;

  beforeEach(() => {
    teamModelMock = ({
      findByPk: sinon.stub(),
      findAll: sinon.stub(),
    } as unknown) as ModelStatic<Team>;
    teamService = new TeamService(teamModelMock);
  });

  describe('getById', () => {
    it('should return a team when found', async () => {
      const expectedTeam = new Team();
      (teamModelMock.findByPk as sinon.SinonStub).resolves(expectedTeam);

      const result = await teamService.getById('1');
      expect(result).to.equal(expectedTeam);
      expect((teamModelMock.findByPk as sinon.SinonStub).calledWith('1')).to.be.true;
    });

    it('should return null when not found', async () => {
      (teamModelMock.findByPk as sinon.SinonStub).resolves(null);

      const result = await teamService.getById('1');
      expect(result).to.be.null;
      expect((teamModelMock.findByPk as sinon.SinonStub).calledWith('1')).to.be.true;
    });
  });

  describe('getAll', () => {
    it('should return all teams', async () => {
      const expectedTeams = [new Team(), new Team()];
      (teamModelMock.findAll as sinon.SinonStub).resolves(expectedTeams);

      const result = await teamService.getAll();
      expect(result).to.deep.equal(expectedTeams);
      expect((teamModelMock.findAll as sinon.SinonStub).called).to.be.true;
    });
  });
  
  it('should return a team with id = 1 and teamName = "Flamengo"', async () => {
    const expectedTeam = new Team();
    expectedTeam.id = 1;
    expectedTeam.teamName = 'Flamengo';
    (teamModelMock.findByPk as sinon.SinonStub).withArgs('1').resolves(expectedTeam);

    const result = await teamService.getById('1');
    expect(result).to.exist;
    expect(result!.id).to.equal(1);
    expect(result!.teamName).to.equal('Flamengo');
  });
  
});