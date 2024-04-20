import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './client';

export const fetchTasksByUserId = createAsyncThunk(
    'tasks/fetchTasksByUserId',
    async () => {
        try {
            const response = await API.get('/tasks');
            return response.data.tasks;
        } catch (err) {
            if (err.response.status === 401) {
                throw err.response.status;
            }
            throw err.response.data.msg;
        }
    }
)

export const createTask = async () => {
    try {
        const response = await API.post('/tasks');

        return response.data.task;
    } catch (err) {
        throw err.response.data.msg;
    }
}

export const updateTaskArchived = async (data) => {
    try {
        const { task_id, archived } = data;
        const response = await API.put(`/tasks/${task_id}`, { archived });

        return response.data;
    } catch (err) {
        throw err.response.data.msg;
    }
}

export const fetchTaskById = createAsyncThunk(
    'task/fetchTaskById',
    async (id) => {
        try {
            const response = await API.get(`/tasks/${id}`);

            return response.data.task;
        } catch (err) {
            throw err.response.data.msg;
        }
    }
)

export const updateTask = async (data) => {
    try {
        const { id, title, deadline_date } = data;
        const response = await API.put(`/tasks/${id}`, {title, deadline_date});
        console.log(response.data);

        return response.data;
    } catch (err) {
        throw err.response.data.msg;
    }
}