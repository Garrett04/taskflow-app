import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTasks, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect } from "react";
import { fetchTasksByUserId } from "../../services/tasksService";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from "../../features/auth/authSlice";

import Subtasks from "./Subtasks";
import { Box, Card, CardContent, Container, Divider, Grid, IconButton, Tooltip, Typography, styled } from "@mui/material";

import { useTheme } from "@emotion/react";
import DeleteTaskButton from "./DeleteTaskButton";
import AddTaskButton from "./AddTaskButton";
import { Main } from "./MainStyles";
import Task from "./Task";
import { Outlet } from "react-router-dom";


const Tasks = () => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticatedStatus === 'fulfilled' && isAuthenticated) {
            dispatch(fetchTasksByUserId());
        } else {
            dispatch(fetchSampleTasks());
        }
    }, [dispatch, isAuthenticatedStatus, isAuthenticated]);


    const renderAllTasks = () => {
        return tasks.map(task => (
            <Grid item key={task.id} xs={12} md={6} lg={4}>
                <Task task={task} />
            </Grid>
        ))
    }

    let content;
    if (tasksStatus === 'pending') {
        content = 'Loading...'
    } else if (tasksStatus === 'fulfilled' && tasks) {
        content = renderAllTasks();
    } else if (tasksStatus === 'rejected') {
        content = tasksError;
    }

    return (
        // Show all tasks here
        <>
            <Typography 
                    paragraph
                    variant="h4"
                    sx={{ 
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1.5rem',
                        } 
                    }} 
                    fontFamily="serif"
                >
                    All Tasks
                </Typography>
            <Container className="tasks">
                <Grid container spacing={3}>
                    {content}
                </Grid>
            </Container>
            {/* Render task modal */}
            <Outlet />
            <AddTaskButton />
        </>
    )
}

export default Tasks;