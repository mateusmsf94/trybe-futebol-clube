// app/backend/src/tests/teamService.spec.ts

import { expect } from 'chai';
import { Model } from 'sequelize';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import Team from '../database/models/TeamsModel';
import TeamService from '../services/TeamServie';

describe('TeamService', () => {
  let teamService: TeamService;
  let teamModel: typeof Model & {
    findByPk: SinonStub;
    findAll: SinonStub;
  };

  beforeEach(() => {
    teamModel = sinon.createStubInstance(Model) as any;
    teamService = new TeamService(teamModel as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#getById()', () => {
    it('should return a team by its ID', async () => {
      const teamId = '1';
      const expectedTeam = new Team();
      teamModel.findByPk = sinon.stub().resolves(expectedTeam);

      const result = await teamService.getById(teamId);

      expect(result).to.equal(expectedTeam);
      expect(teamModel.findByPk.calledWith(teamId)).to.be.true;
    });
  });

  describe('#getAll()', () => {
    it('should return all teams', async () => {
      const expectedTeams = [new Team(), new Team()];
      teamModel.findAll = sinon.stub().resolves(expectedTeams);

      const result = await teamService.getAll();

      expect(result).to.deep.equal(expectedTeams);
      expect(teamModel.findAll.calledOnce).to.be.true;
    });
  });
});
