import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTasks, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect } from "react";
import { fetchTasksByUserId } from "../../services/tasksService";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";
import Subtasks from "./Subtasks";
import { Box, Card, CardActionArea, CardContent, Container, Divider, Grid, Typography, styled } from "@mui/material";
import MuiCardHeader from '@mui/material/CardHeader';
import { useTheme } from "@emotion/react";
import DeleteTaskButton from "./DeleteTaskButton";
import { DrawerHeader } from "../appLayout/MiniDrawer";
import { Main } from "./MainStyles";

const Tasks = () => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const dispatch = useDispatch();

    const CardHeader = styled(MuiCardHeader)(({ theme }) => ({
        backgroundColor: '#E9E3A1',
        padding: '.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        }
    }));

    const CardBottom = styled(CardContent)(() => ({
        display: 'flex',
        justifyContent: 'space-between',
    }));

    const DeadlineDate = styled(Typography)(() => ({
        color: 'red',
        fontSize: '1.2rem'
    }))

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTasksByUserId());
        } else {
            dispatch(fetchSampleTasks());
        }
    }, [dispatch, isAuthenticated]);

    const renderTaskStatus = (taskStatus) => {
        if (taskStatus === 'pending') {
            return <PendingActionsIcon titleAccess="Pending" />;
        } else if (taskStatus === 'completed') {
            return <TaskIcon titleAccess="Completed" />;
        } else if (taskStatus === 'overdue') {
            return <HourglassDisabled titleAccess="Overdue" />;
        }
    }

    const renderAllTasks = () => {
        return tasks.map(task => (
            <Grid item key={task.id} xs={12} md={6} lg={4}>
                <Card className="task-container">
                    <Box>
                        <CardHeader 
                            titleTypographyProps={{ variant: 'taskTitle' }}
                            title={task.title} 
                            action={ <DeleteTaskButton task_id={task.id} /> }
                        />
                    </Box>
                    <Divider />
                    <Subtasks task_id={task.id} />
                    <Divider />
                    <CardBottom>
                        {renderTaskStatus(task.status)}
                        <DeadlineDate>{task.deadline_date}</DeadlineDate>
                    </CardBottom>
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
        <Main>
            
            <Typography 
                    paragraph
                    variant="h4" 
                    sx={{ 
                        width: '100%',
                        margin: '6rem 0 1rem',
                        textAlign: 'center',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1.5rem',
                            marginTop: '4rem'
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
        </Main>
    )
}

export default Tasks;