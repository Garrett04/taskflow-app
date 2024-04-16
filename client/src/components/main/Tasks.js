import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTasks, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { fetchTasksByUserId } from "../../services/tasksService";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { toTitleCase } from "../../utils/toTitleCase";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";
import Subtasks from "./Subtasks";
import { Box, Card, CardActionArea, CardContent, CardHeader, Container, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Tasks = () => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTasksByUserId());
        } else {
            dispatch(fetchSampleTasks());
        }
    }, [dispatch]);

    const renderTaskStatus = (taskStatus) => {
        if (taskStatus === 'pending') {
            return <PendingActionsIcon/>;
        } else if (taskStatus === 'completed') {
            return <TaskIcon/>;
        } else if (taskStatus === 'overdue') {
            return <HourglassDisabled />;
        }
    }

    const renderAllTasks = () => {
        return tasks.map(task => (
            <Grid item key={task.id} xs={12} md={6} lg={4}>
                <Card className="task-container">
                    <CardActionArea>
                        <CardHeader 
                            className="task-title" 
                            titleTypographyProps={{ 
                                variant: 'taskTitle',
                                sx: {
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '1.2rem',
                                    }
                                }
                            }} 
                            title={task.title} 
                        />
                        <Divider />
                        <Subtasks task_id={task.id} />
                        <Divider />
                        <CardContent className="bottom">
                            {renderTaskStatus(task.status)}
                            <Typography variant="deadlineDate">{task.deadline_date}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))
    }

    let content;
    if (tasksStatus === 'pending') {
        content = 'Loading...'
    } else if (tasksStatus === 'fulfilled') {
        content = renderAllTasks();
    } else if (tasksStatus === 'rejected') {
        content = tasksError;
    }

    return (
        // Show all tasks here
        <>
            <Typography 
                    variant="h4" 
                    sx={{ 
                        width: '100%',
                        margin: '6rem 0 1rem',
                        textAlign: 'center',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1.5rem',
                            marginTop: '5rem'
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
        </>
    )
}

export default Tasks;