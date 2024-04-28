import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import subtasksReducer from "../features/subtasks/subtasksSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        tasks: tasksReducer,
        subtasks: subtasksReducer,
    },
})