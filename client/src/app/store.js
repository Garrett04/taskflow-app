import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import taskSubtasksReducer from "../features/subtasks/taskSubtasksSlice";
import userReducer from "../features/user/userSlice";
import userSubtasksReducer from "../features/subtasks/userSubtasksSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        tasks: tasksReducer,
        taskSubtasks: taskSubtasksReducer,
        userSubtasks: userSubtasksReducer
    },
})