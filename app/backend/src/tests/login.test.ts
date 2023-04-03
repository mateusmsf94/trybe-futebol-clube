import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/UsersModels';
import * as authFunction from '../auth/authFunction';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', () => {
  let chaiHttpResponse: ChaiHttp.Response;
  const validUser = {
    email: 'test@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves({
        id: 1,
        email: validUser.email,
        password: '$2a$10$Q1Wl4K4v4Oyd5y6I5R6ddOj6YcN2qHzn6U5GxU5l6U5y6U5GxU5l6', // bcrypt hash for "password"
        
      } as Users);

    sinon
      .stub(authFunction, 'createToken')
      .returns('sample_token');
  });

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
    (authFunction.createToken as sinon.SinonStub).restore();
  });

  it('Successful login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(validUser);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.token).to.equal('sample_token');
  });

  it('Invalid email or password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: validUser.email,
        password: 'wrongpassword',
      });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Invalid email or password');
  });
});
