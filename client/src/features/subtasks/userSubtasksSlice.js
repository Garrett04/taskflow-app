import { createSlice } from "@reduxjs/toolkit"
import { fetchSubtasksByUserId } from "../../services/subtasksService";


const initialState = {
    userSubtasks: [],
    status: 'idle',
    error: null
}

const userSubtasksSlice = createSlice({
    name: 'userSubtasks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubtasksByUserId.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchSubtasksByUserId.fulfilled, (state, action) => {
                state.status = 'fulfilled';

                // handling of duplicate subtasks
                const filteredUserSubtasks = action.payload.filter((subtask, idx, self) => {
                    return self.findIndex(({ subtask_title, subtask_description }) => subtask_title === subtask.subtask_title && subtask_description === subtask.subtask_description) === idx
                }) 

                state.userSubtasks = filteredUserSubtasks;
            })
            .addCase(fetchSubtasksByUserId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;

                state.userSubtasks = [];
            })
    }
})

export const selectUserSubtasks = (state) => state.userSubtasks.userSubtasks;
export const getUserSubtasksStatus = (state) => state.userSubtasks.status;
export const getUserSubtasksError = (state) => state.userSubtasks.error;

export default userSubtasksSlice.reducer;