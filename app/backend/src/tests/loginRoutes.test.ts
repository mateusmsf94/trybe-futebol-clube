import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 when the route exists', async () => {
    const response: Response = await chai.request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response).to.have.status(200);
  });
});
