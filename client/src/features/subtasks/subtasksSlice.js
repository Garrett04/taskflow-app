import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    subtasks: [],
    status: 'idle',
    error: null
}

const sampleSubtasks = [
    { id: '1', title: 'Water the plants subtask', description: null, task_id: '1', checked: true },
    { id: '2', title: 'First build the backend using Express', description: 'Plan out the routes for the server', task_id: '2', checked: false },
    { id: '3', title: 'Learn Dijkstras Path Finding Algorithm', description: null, task_id: '3', checked: true },
    { id: '4', title: 'Hello World', description: null, task_id: '4', checked: true },
];

const subtasksSlice = createSlice({
    name: 'subtasks',
    initialState,
    reducers: {
        fetchSampleSubtasks(state) {
            state.status = 'fulfilled';
            state.subtasks = sampleSubtasks;
        }
    }
})


export const { fetchSampleSubtasks } = subtasksSlice.actions;

export const selectSubtasks = (state) => state.subtasks.subtasks;
export const getSubtasksStatus = (state) => state.subtasks.status;
export const getSubtasksError = (state) => state.subtasks.error;

export default subtasksSlice.reducer;
