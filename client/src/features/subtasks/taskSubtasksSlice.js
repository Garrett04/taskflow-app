import { createSlice } from "@reduxjs/toolkit"
import { fetchSubtasksByTaskId } from "../../services/subtasksService";

const initialState = {
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

export const { deleteSubtaskAction } = taskSubtasksSlice.actions;
export const selectSubtasks = (state) => state.taskSubtasks.taskSubtasks;
export const getSubtasksStatus = (state) => state.taskSubtasks.status;
export const getSubtasksError = (state) => state.taskSubtasks.error;

export default taskSubtasksSlice.reducer;
