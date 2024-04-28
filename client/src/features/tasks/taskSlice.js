// import { createSlice } from "@reduxjs/toolkit"
// import { fetchTaskById } from "../../services/tasksService"

// const initialState = {
//     task: {},
//     status: 'idle',
//     error: null
// }

// const taskSlice = createSlice({
//     name: 'task',
//     initialState,
//     extraReducers: (builder) => {
//         builder 
//             .addCase(fetchTaskById.pending, (state) => {
//                 state.status = 'pending';
//             })
//             .addCase(fetchTaskById.fulfilled, (state, action) => {
//                 state.status = 'fulfilled';
//                 state.task = action.payload;
//             })
//             .addCase(fetchTaskById.rejected, (state, action) => {
//                 state.status = 'rejected';
//                 state.error = action.error.message;
//             })
//     }
// })

// export const selectTask = (state) => state.task.task;
// export const getTaskStatus = (state) => state.task.status;
// export const getTaskError = (state) => state.task.error;

// export default taskSlice.reducer;