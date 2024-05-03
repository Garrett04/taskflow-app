import { useDispatch, useSelector } from "react-redux";
import { filterTasksBySearchTerm, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
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
import { validate as uuidValidate } from 'uuid';


const Tasks = () => {
    const theme = useTheme();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const location = useLocation();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    // either gets the sort and order option from the url
    // or from the task modal.
    // in cases where the user sorts first and then opens a task modal
    // to persist the sort and order options.
    const sort = searchParams.get('sort') || location.state?.sort;
    const order = searchParams.get('order') || location.state?.order;

    const search = searchParams.get('search');
    const dispatch = useDispatch();
    
    // controls the task modal open prop
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // if isModalOpen is false then dispatch fetchTasksByUserId
        // this prevents the dispatch from happening again when modal is open.
        // it improves the performance of the app by a bit.
        if (!isModalOpen) {
            dispatchFetchTasksByUserId(location.pathname, { sort, order });
        }
    }, [
        location.pathname, 
        sort, 
        order, 
        isModalOpen, 
    ]);

    useEffect(() => {
        // if tasksStatus is fulfilled and the search term is present
        // then dispatch filterTasksBySearch action
        // for cases when user reloads the page.
        if (tasksStatus === 'fulfilled' && search) {
            dispatch(filterTasksBySearchTerm({ term: search }));
        }
    }, [dispatch, search, tasksStatus]);
    
    const renderAllTasks = () => {
        return tasks.map(task => {
            return (
                <Grid item key={task.id} xs={12} md={6} lg={4} xl={3}>
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
        try {
            if (e.target === e.currentTarget) {
                // If not a uuid then just navigate and dont delete
                // since the server uses only a uuid.
                if (!uuidValidate(task_id)) {
                    navigate(-1)
                }

                // To delete task if there is no task title.
                if (!task_title) {
                    await deleteTask(task_id);
                }

                // for cases when the subtasks in the task have been updated or added 
                // through the task modal
                // a dispatch of fetchSubtasksByTaskId would update the state
                dispatch(fetchSubtasksByTaskId(task_id));

                // to close the modal
                setIsModalOpen(false);

                // if when adding task and after closing the modal
                // the location.state.from will be present
                // then navigate to home page
                // else when the task has not been added and just isModalOpened
                // then navigate to the page before.
                if (location.state?.from) {
                    // update tasks state after adding task and closing modal.
                    dispatchFetchTasksByUserId(location.pathname);
                    
                    // passing in sort and order from the task modal
                    navigate('/', { state: { sort: location.state.sort, order: location.state.order }});
                } else {
                    navigate(-1, { state: { sort: location.state.sort, order: location.state.order }});
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        // Show all tasks here
        <>
            {/* FilterDropdowns is a top level component which renders
                SortByDropdown and OrderByDropdown.
            */}
            <FilterDropdowns />
            {/* Task Title */}
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
            {/* The main container for tasks */}
            <Container maxWidth="100%">
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