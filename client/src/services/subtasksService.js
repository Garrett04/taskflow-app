import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './client';

export const fetchSubtasksByTaskId = createAsyncThunk(
    'subtasks/fetchSubtasksByTaskId',
    async (task_id, { rejectWithValue }) => {
        try {
            const response = await API.get(`/tasks/${task_id}/subtasks`);
            // console.log(response.data);
            return { task_id, subtasks: response.data.subtasks};
        } catch (err) {
            if (err.response && err.response.status === 404) {
                // rejectWithValue is from the thunkAPI which attaches a custom error message to action.payload
                return rejectWithValue("Add new subtasks by clicking here");
            } else {
                throw err.response.data.msg;
            }
        }
    }
)

export const createSubtask = async (data) => {
    try {
        const { task_id, title, description } = data;

        const response = await API.post(`/tasks/${task_id}/subtasks`, { title, description });
        // console.log(response.data);
        return response.data;
    } catch (err) {
        throw err.response.data.msg;
    }
}

export const deleteSubtask = async (data) => {
    try {
        const { task_id, id } = data;
        const response = await API.delete(`/tasks/${task_id}/subtasks/${id}`);
        // console.log(response.data);
        return { subtask_id: response.data.subtask_id, task_status: response.data.task_status };
    } catch (err) {
        throw err.response.data.msg;
    }
}

export const updateSubtask = async (data) => {
    try {
        const { task_id, id, title, description, checked } = data;
        const response = await API.put(`/tasks/${task_id}/subtasks/${id}`, { title, description, checked });
        console.log('Updated subtask:', response.data.subtask);
        return { subtask: response.data.subtask, task_status: response.data.task_status };
    } catch (err) {
        throw err.response.data.msg;
    }
}