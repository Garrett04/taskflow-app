import { createSlice } from "@reduxjs/toolkit"
import { fetchTasksByUserId } from "../../services/tasksService"


const initialState = {
    sampleTasks: [
        { id: '1', title: 'Water the plants', status: 'pending', deadline_date: '2024-07-19' },
        { id: '2', title: 'Build a full stack app from scratch', status: 'overdue', deadline_date: '2023-06-22' },
        { id: '3', title: 'Learn data structures and algorithms', status: 'completed', deadline_date: '2023-06-28' },
        { id: '4', title: 'Hello World', status: 'completed', deadline_date: '2023-06-28' },
    ],
    tasks: [],
    status: 'idle',
    error: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);

            state.tasks[taskIndex].status = action.payload.task_status;
        },
        filterTasksBySearchTerm: (state, action) => {
            const { term } = action.payload;
            
            const filteredTasks = state.tasks.filter(task => task.title.toLowerCase().includes(term));
            
            // if there is no tasks by the search term
            // then update state.error state and state.tasks.
            // Else update state,tasks to the filteredTasks
            if (filteredTasks.length === 0) {
                state.error = `No tasks found by search term: "${term}"`;
                state.tasks = [];
            } else {
                state.tasks = filteredTasks;
            }

            // console.log(filteredTasks.length); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksByUserId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTasksByUserId.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasksByUserId.rejected, (state, action) =>{
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export const selectSampleTasks = (state) => state.tasks.sampleTasks;


export const { updateTaskStatus, filterTasksBySearchTerm } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;

export default tasksSlice.reducer;