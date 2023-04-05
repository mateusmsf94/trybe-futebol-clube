import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as chai from 'chai';
import {app} from '../app';
import MatchesService from '../services/MatchesService';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { createToken } from '../auth/authFunction';

chai.use(chaiHttp);

describe('Matches Tests', () => {
  const matchesService = new MatchesService(Matches, Teams);
  const validUser = {email: 'admin@admin.com', password: 'secret_admin'};
  let testToken:string
  beforeEach(async() => {
    const {body} = await chai
      .request(app)
      .post('/login')
      .send(validUser)
    testToken = body
  })

  it('Get all matches', async () => {
    const res = await chai.request(app).get('/matches');
    expect(res.status).to.equal(200);
  });

  it('Create a new match', async () => {
    const match = {
      homeTeamId: 1,
      awayTeamId: 2,
      date: new Date(),
      homeTeamGoals: 0,
      awayTeamGoals: 0,
    };

    const res = await chai.request(app).post('/matches').set('Authorization', testToken).send(match);
    expect(res.status).to.equal(201);
    expect(res.body.homeTeamId).to.equal(match.homeTeamId);
    expect(res.body.awayTeamId).to.equal(match.awayTeamId);
  });

  it('Finish a match', async () => {
    const match = await Matches.create({
      homeTeamId: 1,
      awayTeamId: 2,
      date: new Date(),
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });

    const res = await chai.request(app).patch(`/matches/${match.id}/finish`);
    expect(res.status).to.equal(200);
  });

  it('Update match scores', async () => {
    const match = await Matches.create({
      homeTeamId: 1,
      awayTeamId: 2,
      date: new Date(),
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });

    const updatedScores = {
      awayTeamGoals: 2,
      homeTeamGoals: 1,
    };

    const res = await chai.request(app).patch(`/matches/${match.id}`).send(updatedScores);
    expect(res.status).to.equal(200);
  });

  it('Get matches by progress status', async () => {
    const inProgressMatch = await Matches.create({
      homeTeamId: 1,
      awayTeamId: 2,
      date: new Date(),
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });

    const finishedMatch = await Matches.create({
      homeTeamId: 1,
      awayTeamId: 2,
      date: new Date(),
      homeTeamGoals: 1,
      awayTeamGoals: 2,
      inProgress: false,
    });

    // Get matches in progress
    const inProgressRes = await chai.request(app).get('/matches?inProgress=true');
    expect(inProgressRes.status).to.equal(200);
    expect(inProgressRes.body).to.be.an('array');
    
  });

  it('Create a match with equal teams', async () => {
    const match = {
      homeTeamId: 1,
      awayTeamId: 1,
      date: new Date(),
    };

    const res = await chai.request(app).post('/matches').send(match);
    expect(res.status).to.equal(422);
    expect(res.body.message).to.equal('It is not possible to create a match with two equal teams');
  });

  it('Create a match with non-existent team', async () => {
    const match = {
      homeTeamId: 1,
      awayTeamId: 99999, // Non-existent team
      date: new Date(),
    };

    const res = await chai.request(app).post('/matches').send(match);
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('There is no team with such id!');
  });
});
