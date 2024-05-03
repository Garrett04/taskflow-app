import { createSlice } from "@reduxjs/toolkit"
import { fetchTasksByUserId } from "../../services/tasksService"


const initialState = {
    tasks: [],
    status: 'idle',
    error: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action) => {
            const { id, task_status, pathname } = action.payload;

            const taskIndex = state.tasks.findIndex(task => task.id === id);

            state.tasks[taskIndex].status = task_status;

            if (pathname.includes('/completed-tasks')) {
                state.tasks = state.tasks.filter(task => task.status === 'completed');
            }
        },
        filterTasksBySearchTerm: (state, action) => {
            const { term } = action.payload;
            
            const filteredTasks = state.tasks.filter(task => task.title?.toLowerCase().includes(term?.toLowerCase()));
            
            // if there is no tasks by the search term
            // then update state.error state and state.tasks.
            // Else update state,tasks to the filteredTasks
            if (state.status === 'fulfilled') {
                if (filteredTasks.length === 0) {
                    state.error = `No tasks found by search term: "${term}"`;
                    state.tasks = [];
                } else {
                    state.tasks = filteredTasks;
                }
            }

            // console.log(filteredTasks.length); 
        },
        moveTaskToTrash: (state, action) => {
            const { id, deleted_at, pathname } = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === id);
        
            state.tasks[taskIndex].archived = true;
            state.tasks[taskIndex].deleted_at = deleted_at;

            if (pathname === '/') {
                const allTasks = state.tasks.filter(task => task.archived === false);

                state.tasks = allTasks;
            }
        },
        restoreTask: (state, action) => {
            const { id, pathname } = action.payload;

            const taskIndex = state.tasks.findIndex(task => task.id === id);

            state.tasks[taskIndex].archived = false;
            state.tasks[taskIndex].deleted_at = null;

            if (pathname.includes('/trash')) {
                state.tasks = state.tasks.filter(task => task.archived === true);
            } else if (pathname.includes('/overdue-tasks')) {
                state.tasks = state.tasks.filter(task => task.status === 'overdue');
            } else if (pathname.includes('/completed-tasks')) {
                state.tasks = state.tasks.filter(task => task.status === 'completed');
            }
        },
        updateTaskTitleAction: (state, action) => {
            const { id, title } = action.payload;

            const taskIndex = state.tasks.findIndex(task => task.id === id);

            state.tasks[taskIndex].title = title;
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

export const { 
    updateTaskStatus, 
    filterTasksBySearchTerm, 
    moveTaskToTrash, 
    restoreTask, 
    updateTaskTitleAction 
} = tasksSlice.actions;


export const selectTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;
export const selectTaskById = (id) => (state) => state.tasks.tasks.find(task => task.id === id);

export default tasksSlice.reducer;