import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTasks, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect } from "react";
import { fetchTasksByUserId } from "../../services/tasksService";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { toTitleCase } from "../../utils/toTitleCase";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";
import Subtasks from "./Subtasks";
import { Box, Typography } from "@mui/material";

const Tasks = () => {
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
            <Box className="task-container" key={task.id}>
                <Box className="task-title">
                    <Typography variant="taskTitle">{task.title}</Typography>
                </Box>
                <Subtasks task_id={task.id} />
                <Box className="bottom">
                    {renderTaskStatus(task.status)}
                    <Typography className="deadline-date">{task.deadline_date}</Typography>
                </Box>
            </Box>
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
        <Box className="tasks">
            <Typography variant="h4" sx={{ width: '100%' }} fontFamily="serif">
                All Tasks
            </Typography>
            {content}
        </Box>
    )
}

export default Tasks;