const app = require('../app');
const pool = require('../config/db/config');
const request = require('supertest');
const cronJob = require('../config/cronJob');
const User = require('../models/User');
const Subtask = require('../models/Subtask');
const Task = require('../models/Task');
const fs = require('fs');
const path = require('path');

let username = process.env.TEST_USERNAME;
let password = process.env.TEST_PASSWORD;
let accessToken;
let task_id;

// const tasksFixture = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/tasks.json')));

afterAll(async () => {
    await User.deleteByUsername(username);
    await pool.end();
    cronJob.stop();
})

beforeAll(async () => {
    const res = await request(app)
                        .post('/api/auth/register')
                        .send({ username, password });

    accessToken = res.headers['set-cookie'][0];

    // console.log(accessToken);

    const resTask = await request(app)
                            .post('/api/tasks')
                            .set("Cookie", accessToken);
    
    task_id = resTask.body.task.id;
})

describe('GET', () => {
    describe('/users', () => {
        it('returns a status code of 200 when user is found', async () => {
            const res = await request(app)
                                .get('/api/users')
                                .set("Cookie", accessToken);

            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when user is not authorized', async () => {
            const res = await request(app)
                                .get('/api/users')

            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })
    })
})

describe('PUT', () => {
    describe('/users', () => {
        it('returns a status code of 200 when user is updated successfully', async () => {
            const res = await request(app)
                        .put('/api/users')
                        .send({ 
                            username: 'temp_username1',
                            first_name: 'hello',
                            last_name: 'world', 
                            old_password: password,
                            new_password: '123' 
                        })
                        .set('Cookie', accessToken);

            // console.log(res.body);
            username = res.body.user.username;
            password = '123';
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 400 when user already exists', async () => {
            const res = await request(app)
                                .put('/api/users')
                                .send({
                                    username,
                                    first_name: 'hello',
                                    last_name: 'world', 
                                    old_password: password,
                                    new_password: '1234' 
                                })
                                .set('Cookie', accessToken);
            
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
        })

        it('returns a status code of 400 when new password is same as old password', async () => {
            const res = await request(app)
                                .put('/api/users')
                                .send({
                                    username: 'temp_username2',
                                    first_name: 'hello',
                                    last_name: 'world', 
                                    old_password: password,
                                    new_password: password 
                                })
                                .set('Cookie', accessToken);
            
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
        })

        it('returns a status code of 401 when old password is invalid', async () => {
            const res = await request(app)
                                .put('/api/users')
                                .send({
                                    username: 'temp_username2',
                                    first_name: 'hello',
                                    last_name: 'world', 
                                    old_password: '1234',
                                    new_password: '12345'
                                })
                                .set('Cookie', accessToken);
            
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .put('/api/users')
                                .send({
                                    username: 'temp_username2',
                                    first_name: 'hello',
                                    last_name: 'world', 
                                    old_password: password,
                                    new_password: '12345'
                                })
            
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })
    })
})