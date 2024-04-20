import { useDispatch, useSelector } from "react-redux";
import { getTasksError, getTasksStatus, selectSampleTasks, selectTasks } from "../../features/tasks/tasksSlice";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { renderPageTitle } from "../../utils/renderPageTitle";


const Tasks = () => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    const sampleTasks = useSelector(selectSampleTasks);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksByUserId());
    }, [dispatch]);

    const navigate = useNavigate();

    const location = useLocation();

    let status = null;

    if (location.pathname === '/completed-tasks') {
        status = 'completed';
    } else if (location.pathname === '/overdue-tasks') {
        status = 'overdue';
    } else if (location.pathname === '/trash') {
        status = 'deleted';
    }

    const renderAllTasks = () => {
        // Checks if user isAuthenticated then render the users tasks 
        // else just the sampleTasks
        const tasksToRender = isAuthenticated ? tasks : sampleTasks;
        
        return tasksToRender.map(task => {
            // If task.status === status then return the task component with that status
            // or if status is null return all tasks
            if (task.status === status || !status) {
                return (
                    <Grid onClick={() => navigate(`/task/${task.id}`)} item key={task.id} xs={12} md={6} lg={4}>
                        <Task task={task} />
                    </Grid>
                )
            }
        })
    }

    let content;
    if (tasksStatus === 'pending') {
        content = 'Loading...'
    } else if (tasksStatus === 'fulfilled' || tasks) {
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
                {renderPageTitle(status)}
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