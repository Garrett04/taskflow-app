import { createSlice } from "@reduxjs/toolkit"
import { fetchSubtasksByTaskId } from "../../services/subtasksService";

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
    taskSubtasks: {},
    status: 'idle',
    error: [null]
}

const taskSubtasksSlice = createSlice({
    name: 'taskSubtasks',
    initialState,
    reducers: {
        deleteSubtaskAction: (state, action) => {
            const { task_id, id } = action.payload;
            state.taskSubtasks[task_id] = state.taskSubtasks[task_id].filter(subtask => subtask.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubtasksByTaskId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchSubtasksByTaskId.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const { task_id, subtasks } = action.payload;
                state.taskSubtasks[task_id] = subtasks;
            })
            .addCase(fetchSubtasksByTaskId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.error.message;

                // gets the asyncThunk's argument value which is task_id.
                const task_id = action.meta.arg;

                // reassign the subtask with the task id with an empty array
                // this ensures the last subtask is emptied in the redux state.
                state.taskSubtasks[task_id] = [];
            })
    }
})

export const selectSampleSubtasks = (state) => state.taskSubtasks.sampleSubtasks;

export const { deleteSubtaskAction } = taskSubtasksSlice.actions;
export const selectSubtasks = (state) => state.taskSubtasks.taskSubtasks;
export const getSubtasksStatus = (state) => state.taskSubtasks.status;
export const getSubtasksError = (state) => state.taskSubtasks.error;

export default taskSubtasksSlice.reducer;