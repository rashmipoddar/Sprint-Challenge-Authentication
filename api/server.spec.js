const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');


describe('check the environment', () => {
  it('should set up db environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('endpoints testing', () => {

  describe('register a user', () => {
    describe('POST /api/auth/register', () => {
      const user = {username: 'harry', password: 'password'};
      beforeEach(async () => {
        await db('users').truncate();
      })

      it('should return status 201', async () => {
        const res = await request(server).post('/api/auth/register').send(user);
        expect(res.status).toBe(201);
      });

      it('should return json formatted data', async () => {
        const res = await request(server).post('/api/auth/register').send(user);
        expect(res.type).toMatch(/json/i);
      });

      it('should return added user', async () => {
        const res = await request(server).post('/api/auth/register').send(user);
        expect(res.body.id).toEqual(1);
        expect(res.body.id).toBeDefined();
        expect(res.body.username).toBe('harry');
      });
    });
  });
  
  describe('login a user', () => {
    describe('POST /api/auth/login', () => {
      const user = {username: 'harry', password: 'password'};

      it('should return status 200', async () => {
        const res = await request(server).post('/api/auth/login').send(user);
        expect(res.status).toBe(200);
      });

      it('should return json formatted data', async () => {
        const res = await request(server).post('/api/auth/login').send(user);
        expect(res.type).toMatch(/json/i);
      });

      it('should return logged in user', async () => {
        const res = await request(server).post('/api/auth/login').send(user);
        expect(res.body.id).toEqual(1);
        expect(res.body.id).toBeDefined();
        expect(res.body.username).toBe('harry');
        expect(res.body.token).toBeDefined();
      });
    });
  });

  describe('should return error without token', () => {
    describe('GET /api/jokes', () => {

      it('should return status 400', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.status).toBe(400);
      });

      it('should return json formatted data', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.type).toMatch(/json/i);
      });

      it('should return an array of jokes', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.body.length).toBeUndefined();
      });
    });
  });

  describe('get jokes for logged in user', () => {
    describe('GET /api/jokes', () => {

      it('should return status 400', async () => {
        const res = await request(server).get('/api/jokes').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJoYXJyeSIsImlhdCI6MTU3Mzg0MDcwMywiZXhwIjoxNTczODQ0MzAzfQ.ilH544gouQkvH-48y73Mad2oIBwOTQk2XU1ZGYDFvss');
        expect(res.status).toBe(200);
      });

      it('should return json formatted data', async () => {
        const res = await request(server).get('/api/jokes').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJoYXJyeSIsImlhdCI6MTU3Mzg0MDcwMywiZXhwIjoxNTczODQ0MzAzfQ.ilH544gouQkvH-48y73Mad2oIBwOTQk2XU1ZGYDFvss');
        expect(res.type).toMatch(/json/i);
      });

      it('should return an array of jokes', async () => {
        const res = await request(server).get('/api/jokes').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJoYXJyeSIsImlhdCI6MTU3Mzg0MDcwMywiZXhwIjoxNTczODQ0MzAzfQ.ilH544gouQkvH-48y73Mad2oIBwOTQk2XU1ZGYDFvss');
        // console.log(res.body);
        expect(res.body[0]).toHaveProperty('joke');
      });
    });
  });

});

