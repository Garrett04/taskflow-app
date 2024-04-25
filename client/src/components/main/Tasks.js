import { useSelector } from "react-redux";
import { getTasksError, getTasksStatus, selectSampleTasks, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import AddTaskButton from "./task/AddTaskButton";
import Task from "./task/Task";
import { Outlet, ScrollRestoration, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { renderPageTitle } from "../../utils/renderPageTitle";
import { dispatchFetchTasksByUserId } from "../../utils/dispatchFetchTasksByUserId";
import TaskModal from "../../pages/TaskModal";


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
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const sort = searchParams.get('sort') || location.state?.sort;
    const order = searchParams.get('order') || location.state?.order;
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // if isModalOpen is false then dispatch fetchTasksByUserId
        // this prevents the dispatch from happening again when modal is open.
        if (!isModalOpen) {
            console.log(sort, order, location.pathname);
            dispatchFetchTasksByUserId(location.pathname, { sort, order });
        }
    }, [location.pathname, sort, order, isModalOpen]);


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
                    <Task 
                        task={task} 
                        page={page}
                        sort={sort}
                        order={order}
                        setIsModalOpen={setIsModalOpen}
                    />
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

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
            
            // if when adding task and after closing the modal
            // the location.state.from will be present
            // then navigate to home page
            // else when the task has not been added and just isModalOpened
            // then navigate to the page before.
            console.log(location);
            if (location.state?.from) {
                console.log(location.pathname);
                // update tasks state after adding task.
                dispatchFetchTasksByUserId(location.pathname);
                navigate('/', { state: { sort: location.state.sort, order: location.state.order }});
            } else {
                console.log("hello 2");
                navigate(-1, { state: { sort: location.state.sort, order: location.state.order }});
            }
        }
    };

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
            {/* <Outlet /> */}
            <TaskModal handleClose={handleClose} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <AddTaskButton />
            
        </>
    )
}

export default Tasks;