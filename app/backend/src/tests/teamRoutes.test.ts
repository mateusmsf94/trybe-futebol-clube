import { Router } from 'express';
import * as chai from 'chai';
import * as sinon from 'sinon';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamServie';

const expect = chai.expect;

describe('Router - Team', () => {
  let routerTeam: Router;
  let teamController: TeamController;
  let teamService: TeamService;

  beforeEach(() => {
    teamService = sinon.createStubInstance(TeamService);
    teamController = new TeamController(teamService);
    routerTeam = Router();
    routerTeam.get('/', teamController.getAll);
    routerTeam.get('/:id', teamController.getById);
  });

  it('should call getAll method from TeamController when GET / is called', () => {
    const getAllStub = sinon.stub(teamController, 'getAll');
    const req = {} as any;
    const res = {
      send: sinon.stub(),
    } as any;
    routerTeam.get('/', (req, res) => {
      teamController.getAll(req, res);
      expect(getAllStub.calledOnce).to.be.true;
    });
  });

  it('should call getById method from TeamController when GET /:id is called', () => {
    const getByIdStub = sinon.stub(teamController, 'getById');
    const req = { params: { id: '1' } } as any;
    const res = {
      send: sinon.stub(),
    } as any;
    routerTeam.get('/:id', (req, res) => {
      teamController.getById(req, res);
      expect(getByIdStub.calledOnce).to.be.true;
    });
  });
});
