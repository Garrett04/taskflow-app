import { createSlice } from "@reduxjs/toolkit"
import { fetchSubtasksByTaskId } from "../../services/subtasksService";

const initialState = {
    sampleSubtasks: [
        { id: '1', title: 'Water the plants subtask', description: null, task_id: '1', checked: true },
        { id: '2', title: 'First build the backend using Express', description: 'Plan out the routes for the server', task_id: '2', checked: false },
        { id: '2', title: 'Second build the frontend using React', description: null, task_id: '3', checked: true },
        { id: '3', title: 'Learn Dijkstras Path Finding Algorithm', description: null, task_id: '4', checked: true },
        { id: '4', title: 'Hello World', description: null, task_id: '5', checked: true },
    ],
    subtasks: [],
    status: 'idle',
    error: null
}

const subtasksSlice = createSlice({
    name: 'subtasks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubtasksByTaskId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchSubtasksByTaskId.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.subtasks = state.subtasks.concat(action.payload);
            })
            .addCase(fetchSubtasksByTaskId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export const selectSampleSubtasks = (state) => state.subtasks.sampleSubtasks;
export const selectSubtasks = (state) => state.subtasks.subtasks;
export const getSubtasksStatus = (state) => state.subtasks.status;
export const getSubtasksError = (state) => state.subtasks.error;

export default subtasksSlice.reducer;
