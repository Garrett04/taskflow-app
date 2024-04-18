import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './client';

export const fetchSubtasksByTaskId = createAsyncThunk(
    'subtasks/fetchSubtasksByTaskId',
    async (task_id) => {
        try {
            const response = await API.get(`/tasks/${task_id}/subtasks`);
            return response.data.subtasks;
        } catch (err) {
            throw err.response.data.msg;
        }
    }
)