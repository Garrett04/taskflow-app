import { createSlice } from "@reduxjs/toolkit"
import { deleteSubtask, fetchSubtasksByTaskId } from "../../services/subtasksService";

const initialState = {
    sampleSubtasks: {
        '1': [ 
            {id: '1', title: 'Water the plants subtask', description: null, task_id: '1', checked: true} 
        ],
        '2': [ 
            {id: '2', title: 'First build the backend using Express', description: 'Plan out the routes for the server', task_id: '2', checked: false},
            {id: '2', title: 'Second build the frontend using React', description: null, task_id: '2', checked: true }
        ],
        '3': [
            {id: '3', title: 'Learn Dijkstras Path Finding Algorithm', description: null, task_id: '4', checked: true },
        ],
        '4': [
            {id: '4', title: 'Hello World', description: null, task_id: '5', checked: true },
        ],
    },
    subtasks: {},
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
                const { task_id, subtasks } = action.payload;
                state.subtasks[task_id] = subtasks;
            })
            .addCase(fetchSubtasksByTaskId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.error.message;

                // gets the asyncThunk's argument value which is task_id.
                const task_id = action.meta.arg;

                // reassign the subtask with the task id with an empty array
                // this ensures the last subtask is emptied in the redux state.
                state.subtasks[task_id] = [];
            })
    }
})

export const selectSampleSubtasks = (state) => state.subtasks.sampleSubtasks;
export const selectSubtasks = (state) => state.subtasks.subtasks;
export const getSubtasksStatus = (state) => state.subtasks.status;
export const getSubtasksError = (state) => state.subtasks.error;

export default subtasksSlice.reducer;
