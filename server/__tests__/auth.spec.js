const app = require('../app');
const pool = require('../config/db/config');
const request = require('supertest');
const cronJob = require('../config/cronJob');
const User = require('../models/User');

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

afterAll(async () => {
    await User.deleteByUsername(username);
    await pool.end();
    cronJob.stop();
})

describe('register', () => {
    it('returns status code of 201 when user is created', async () => {
        const res = await request(app)
                        .post('/api/auth/register')
                        .send({ username, password })
        
        expect(res.statusCode).toEqual(201);
    })

    it('returns status code of 400 when user already exists', async () => {
        const res = await request(app)
                        .post('/api/auth/register')
                        .send({ username, password })

        expect(res.statusCode).toEqual(400);
    })
})

describe('login', () => {
    afterAll(async () => {
        await User.deleteByUsername(username);
    })

    it('returns status code of 200 when user is logged in successfully', async () => {
        const res = await request(app)
                        .post('/api/auth/login')
                        .send({ username, password })

        expect(res.statusCode).toEqual(200);
    })

    it('returns status code of 401 when user is not authorized', async () => {
        const res = await request(app)
                        .post('/api/auth/login')
                        .send({ username, password: '1234' })
        
        expect(res.statusCode).toEqual(401);
    })
})

describe('logout', () => {
    let accessToken;

    beforeAll(async () => {
        const res = await request(app)
                .post('/api/auth/register')
                .send({ username, password });
        
        
        accessToken = res.headers['set-cookie'][0];
    })

    it('returns status code of 200 when user is logged out successfully', async () => {
        const res = await request(app)
                            .post('/api/auth/logout')
                            .set("Cookie", accessToken)
        
        expect(res.statusCode).toEqual(200);
    })

    it('returns status code of 401 when user is unauthorized', async () => {
        const res = await request(app)
                            .post('/api/auth/logout')
        
        expect(res.statusCode).toEqual(401);
    })
})