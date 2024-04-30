const app = require('../app');
const pool = require('../config/db/config');
const request = require('supertest');
const cronJob = require('../config/cronJob');
const User = require('../models/User');
const Subtask = require('../models/Subtask');
const Task = require('../models/Task');
const fs = require('fs');
const path = require('path');

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
let accessToken;
let task_id;

const tasksFixture = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/tasks.json')));

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

let { subtasks } = tasksFixture.tasks[0];
let subtask_id;

afterEach(async () => {
    await Subtask.delete(subtask_id);
})

describe('POST', () => {
    describe('/tasks/:task_id/subtasks', () => {
        

        it('returns a status code of 201 when a subtask is created', async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
                                .set("Cookie", accessToken);
        
            subtask_id = res.body.subtask.id;
            expect(res.statusCode).toEqual(201);
        })

        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
        
            expect(res.statusCode).toEqual(401);
        })
    })
})

describe('GET', () => {
    describe('/tasks/:task_id/subtasks', () => {
        let subtask_id;

        beforeAll(async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
                                .set("Cookie", accessToken);
            
            subtask_id = res.body.subtask.id;
        })

        afterEach(async () => {
            await Subtask.delete(subtask_id);
        })

        it('returns a status code of 200 when subtasks found by task id', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })
        
        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks`)
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 404 when subtasks not found by task id', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(404);
        })
    })

    describe('/tasks/:task_id/subtasks/:id', () => {
        let subtask_id;

        beforeAll(async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
                                .set("Cookie", accessToken);
            
            subtask_id = res.body.subtask.id;
        })

        afterEach(async () => {
            await Subtask.delete(subtask_id);
        })

        it('returns a status code of 200 when subtask found by its id', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 404 when subtask not found by its id', async () => {
            const res = await request(app)
                                .get(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(404);
        })
    })
})

describe('PUT', () => {
    describe('/tasks/:task_id/subtasks/:id', () => {
        let subtask_id;

        beforeAll(async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
                                .set("Cookie", accessToken);
            
            // console.log(res.body);
            subtask_id = res.body.subtask.id;
        })

        afterEach(async () => {
            await Subtask.delete(subtask_id);
        })

        it('returns a status code of 200 when subtask is updated', async () => {
            const res = await request(app)
                                .put(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .send({
                                    title: subtasks[1].title,
                                    description: subtasks[1].description
                                })
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .put(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .send({
                                    title: subtasks[1].title,
                                    description: subtasks[1].description
                                })
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 404 when subtask is not found', async () => {
            const res = await request(app)
                                .put(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .send({
                                    title: subtasks[1].title,
                                    description: subtasks[1].description
                                })
                                .set("Cookie", accessToken);
        
            expect(res.statusCode).toEqual(404);
        })
    })
})

describe('DELETE', () => {
    describe('/tasks/:task_id/subtasks/:id', () => {
        let subtask_id;

        beforeAll(async () => {
            const res = await request(app)
                                .post(`/api/tasks/${task_id}/subtasks`)
                                .send({ 
                                    title: subtasks[0].title, 
                                    description: subtasks[0].description
                                })
                                .set("Cookie", accessToken);
            
            // console.log(res.body);
            subtask_id = res.body.subtask.id;
        })

        it('returns a status code of 200 when subtask is deleted', async () => {
            const res = await request(app)
                                .delete(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })

        it('returns a status code of 401 when unauthorized', async () => {
            const res = await request(app)
                                .delete(`/api/tasks/${task_id}/subtasks/${subtask_id}`);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(401);
        })

        it('returns a status code of 404 when subtask is not found by its id', async () => {
            const res = await request(app)
                                .delete(`/api/tasks/${task_id}/subtasks/${subtask_id}`)
                                .set("Cookie", accessToken);
        
            // console.log(res.body);
            expect(res.statusCode).toEqual(404);
        })

        
    })
})