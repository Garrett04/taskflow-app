const app = require('../app');
const pool = require('../config/db/config');
const request = require('supertest');
const cronJob = require('../config/cronJob');
const User = require('../models/User');
const Task = require('../models/Task');
const fs = require('fs');
const path = require('path');

const tasksFixture = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/tasks.json')));
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
let accessToken;
let task_id;

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
})



describe('POST', () => {
    afterEach(async () => {
        await Task.deleteById(task_id);
    })
    
    describe('/tasks', () => {
        it('returns a status code of 201 when a task is created', async () => {
            const res = await request(app)
                                .post('/api/tasks')
                                .set("Cookie", accessToken);
    
            task_id = res.body.task.id
    
            expect(res.statusCode).toEqual(201);
        })
    
        it('returns a status code of 401 when user is not authorized', async () => {
            const res = await request(app)
                                .post('/api/tasks')
    
            expect(res.statusCode).toEqual(401);
        })
    })
})

describe('GET', () => {
    describe('/tasks', () => {
        let task_id;
        beforeAll(async () => {
            const res = await request(app)
                                .post('/api/tasks')
                                .set("Cookie", accessToken);
            task_id = res.body.task.id;

            // console.log(task_id);
        })

        afterEach(async () => {
            await Task.deleteById(task_id);
        })

        it('returns a status code of 200 when tasks found', async () => {
            const res = await request(app)
                                .get('/api/tasks')
                                .set("Cookie", accessToken);
    
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when not authorized', async () => {
            const res = await request(app)
                                .get('/api/tasks')
    
            expect(res.statusCode).toEqual(401);
        })
    
        it('returns a status code of 404 when tasks not found', async () => {
            const res = await request(app)
                                .get('/api/tasks')
                                .set("Cookie", accessToken);
    
            expect(res.statusCode).toEqual(404);
        })
    })

    describe('/tasks/:id', () => {
        let task_id;
        beforeAll(async () => {
            const res = await request(app)
                                .post('/api/tasks')
                                .set("Cookie", accessToken);
            task_id = res.body.task.id;

            // console.log(task_id);
        })

        afterEach(async () => {
            await Task.deleteById(task_id);
        })

        it('returns a status code of 200 when a task is found by its id', async () => {
            const res = await request(app)
                            .get(`/api/tasks/${task_id}`)
                            .set("Cookie", accessToken);

            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when not authorized', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}`)
    
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 404 when a task is not found by its id', async () => {
            const res = await request(app)
                            .get(`/api/tasks/${task_id}`)
                            .set("Cookie", accessToken);

            expect(res.statusCode).toEqual(404);
        })
    })
})

describe('PUT', () => {
    describe('/tasks/:id', () => {
        let task_id;
        let { title } = tasksFixture.tasks[0];

        beforeAll(async () => {
            const res = await request(app)
                                .post('/api/tasks')
                                .set("Cookie", accessToken);
            task_id = res.body.task.id;

            // console.log(task_id);
        })

        it('returns a status code of 200 when a task has been updated', async () => {
            const res = await request(app)
                            .put(`/api/tasks/${task_id}`)
                            .send({ 
                                title
                            })
                            .set("Cookie", accessToken);

            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when not authorized', async () => {
            const res = await request(app)
                            .put(`/api/tasks/${task_id}`)
                            .send({ 
                                title: title
                            })
                            // .set("Cookie", accessToken);

            expect(res.statusCode).toEqual(401);
        })
    })
})

describe('DELETE', () => {
    describe('/tasks/:id', () => {
        let task_id;

        beforeAll(async () => {
            const res = await request(app)
                                .post('/api/tasks')
                                .set("Cookie", accessToken);
            task_id = res.body.task.id;

            // console.log(task_id);
        })

        it('returns a status code of 200 when a task has been deleted', async () => {
            const res = await request(app)
                            .delete(`/api/tasks/${task_id}`)
                            .set("Cookie", accessToken);

            expect(res.statusCode).toEqual(200);
        })
    })
})