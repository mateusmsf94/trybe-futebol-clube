// app/backend/src/tests/teamController.spec.ts

import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import Team from '../database/models/TeamsModel';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamServie';

describe('TeamController', () => {
  let teamController: TeamController;
  let teamService: TeamService;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    teamService = sinon.createStubInstance(TeamService) as any;
    teamController = new TeamController(teamService as any);
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#getById()', () => {
    it('should return a team by its ID', async () => {
      const teamId = '1';
      const expectedTeam = new Team();
      (teamService.getById as SinonStub).resolves(expectedTeam);
      req.params = { id: teamId };

      await teamController.getById(req as Request, res as Response);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(expectedTeam)).to.be.true;
    });

    it('should return 404 when team not found', async () => {
      const teamId = '1';
      (teamService.getById as SinonStub).resolves(null);
      req.params = { id: teamId };

      await teamController.getById(req as Request, res as Response);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect((res.json as SinonStub).calledWith({ message: 'Team not found' })).to.be.true;
    });

    it('should return 500 when an error occurs', async () => {
      const teamId = '1';
      const error = new Error('Error fetching team');
      (teamService.getById as SinonStub).rejects(error);
      req.params = { id: teamId };

      await teamController.getById(req as Request, res as Response);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect((res.json as SinonStub).calledWith({ message: 'Error fetching team', error })).to.be.true;
    });
  });

  describe('#getAll()', () => {
    it('should return all teams', async () => {
      const expectedTeams = [new Team(), new Team()];
      (teamService.getAll as SinonStub).resolves(expectedTeams);

      await teamController.getAll(req as Request, res as Response);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(expectedTeams)).to.be.true;
    });

    it('should return 500 when an error occurs', async () => {
      const error = new Error('Error fetching teams');
      (teamService.getAll as SinonStub).rejects(error);

    })
  })
})