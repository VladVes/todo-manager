import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../../src/server';

describe('api base', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  beforeEach(() => {
    server = app().listen();
  });

  it('GET 200', async () => {
    let res;
    res = await request.agent(server).get('/');
    expect(res).toHaveHTTPStatus(200);
  });

  /*
  it('GET 302', async () => {
    const res = await request.agent(server).get('/user/profile');
    expect(res).toHaveHTTPStatus(302);
  });
  */

  it('GET 404', async () => {
    const res = await request.agent(server).get('/wrong-path');
    expect(res).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    console.log('AFTER EACH!');
    server.close();
    done();
  });
});
