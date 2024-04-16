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
        }
    }
)