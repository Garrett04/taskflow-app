import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import subtasksReducer from "../features/subtasks/subtasksSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        subtasks: subtasksReducer,
    }
})