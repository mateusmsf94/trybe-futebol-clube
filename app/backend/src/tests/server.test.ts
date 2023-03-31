import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import 'dotenv/config';
chai.use(chaiHttp);

const { expect } = chai;

describe('Server', () => {
  let app: App;
  const port = process.env.APP_PORT || 3001;
  const url = `http://localhost:${port}`;

  // before(async () => {
  //   app = new App();
  //   await app.start(port);
  // });

  // after(async () => {
  //   await app.stop();
  // });

  it('should return a 200 response from the root route', async () => {
    const res = await chai.request(url).get('/');
    expect(res.status).to.equal(200);
  });

  // Add more tests for your routes here
});
