import { useDispatch, useSelector } from "react-redux";
import { filterTasksBySearchTerm, getTasksError, getTasksStatus, selectSampleTasks, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import AddTaskButton from "./task/AddTaskButton";
import Task from "./task/Task";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { renderPageTitle } from "../../utils/renderPageTitle";
import { dispatchFetchTasksByUserId } from "../../utils/dispatchFetchTasksByUserId";
import TaskModal from "./TaskModal";
import FilterDropdowns from "./filterOptions/FilterDropdowns";
import { deleteTask } from "../../services/tasksService";
import { fetchSubtasksByTaskId } from "../../services/subtasksService";


const Tasks = () => {
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
    const search = searchParams.get('search');
    const dispatch = useDispatch();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // if isModalOpen and search term is false then dispatch fetchTasksByUserId
        // this prevents the dispatch from happening again when modal is open or search term is not included.
        if (!isModalOpen) {
            // console.log(sort, order, location.pathname);
            dispatchFetchTasksByUserId(location.pathname, { sort, order });
        }
    }, [
        location.pathname, 
        sort, 
        order, 
        isModalOpen, 
        search
    ]);

    useEffect(() => {
        // if tasksStatus is fulfilled and the search term is present
        // then dispatch filterTasksBySearch action
        // console.log(tasksStatus, search);
        if (tasksStatus === 'fulfilled' && search) {
            // console.log('hello');
            dispatch(filterTasksBySearchTerm({ term: search }));
        }
    }, [dispatch, search, tasksStatus]);
    
    const renderAllTasks = () => {
        // Checks if user isAuthenticated then render the users tasks 
        // else just the sampleTasks
        const tasksToRender = isAuthenticated ? tasks : sampleTasks;
        
        return tasksToRender.map(task => {
            return (
                <Grid item key={task.id} xs={12} md={6} lg={4}>
                    <Task 
                        task={task}
                        sort={sort}
                        order={order}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Grid>
            )
        })
    }

    let content;
    if (tasksStatus === 'rejected' || tasksError) {
        content = tasksError;
    } else if (tasksStatus === 'pending') {
        content = (
            <Box sx={{ display: 'flex', margin: 'auto' }}>
                <CircularProgress size="4rem" color="info" />
            </Box>
        )
    } else if (tasksStatus === 'fulfilled' || !isAuthenticated) {
        content = renderAllTasks();
    }

    const handleClose = async (e, task_title, task_id) => {
        if (e.target === e.currentTarget) {
            // console.log(e.currentTarget);
            // To delete task if there is no task title.
            
            if (!task_title) {
                await deleteTask(task_id);
            }
            dispatch(fetchSubtasksByTaskId(task_id));

            setIsModalOpen(false);
            
            // if when adding task and after closing the modal
            // the location.state.from will be present
            // then navigate to home page
            // else when the task has not been added and just isModalOpened
            // then navigate to the page before.
            if (location.state?.from) {
                // console.log("hello", location.pathname);
                // update tasks state after adding task.
                dispatchFetchTasksByUserId(location.pathname);
                navigate('/', { state: { sort: location.state.sort, order: location.state.order }});
            } else {
                // console.log("hello 2");
                navigate(-1, { state: { sort: location.state.sort, order: location.state.order }});
            }
        }
    };

    return (
        // Show all tasks here
        <>
            <FilterDropdowns />
            <Typography 
                paragraph
                variant="h4"
                sx={{ 
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1.5rem',
                    },
                }} 
                fontFamily="serif"
            >
                {renderPageTitle(location.pathname)}
            </Typography>
            <Container className="tasks">
                <Grid container spacing={3}>
                    {content}
                </Grid>
            </Container>
            <TaskModal 
                handleClose={handleClose} 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
            />
            <AddTaskButton />
        </>
    )
}

export default Tasks;