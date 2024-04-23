import { useSelector } from "react-redux";
import { getTasksError, getTasksStatus, selectSampleTasks, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect } from "react";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { renderPageTitle } from "../../utils/renderPageTitle";
import { dispatchFetchTasksByUserId } from "../../utils/dispatchFetchTasksByUserId";


const Tasks = ({
    page
}) => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    const sampleTasks = useSelector(selectSampleTasks);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    useEffect(() => {
        console.log(sort, order);
        dispatchFetchTasksByUserId(location.pathname, { sort: sort, order: order });
    }, [location.pathname, sort, order]);

    let status = null;
    let archived;

    if (page === 'Completed Tasks') {
        status = 'completed';
    } else if (page === 'Overdue Tasks') {
        status = 'overdue';
    } else if (page === 'Trash') {
        status = 'archived';
        archived = true;
    }
    
    const renderAllTasks = () => {
        // Checks if user isAuthenticated then render the users tasks 
        // else just the sampleTasks
        const tasksToRender = isAuthenticated ? tasks : sampleTasks;
        
        return tasksToRender.map(task => {
            return (
                <Grid item key={task.id} xs={12} md={6} lg={4}>
                    <Task task={task} page={page} />
                </Grid>
            )
        })
    }

    let content;
    if (tasksStatus === 'pending') {
        content = 'Loading...'
    } else if (tasksStatus === 'fulfilled' || !isAuthenticated) {
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