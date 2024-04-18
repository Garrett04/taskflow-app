import { Box, Card, CardContent, Divider, Grid, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import MuiCardHeader from '@mui/material/CardHeader';
import DeleteTaskButton from "./DeleteTaskButton";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubtasksByTaskId } from "../../services/subtasksService";
import { selectSubtasks } from "../../features/subtasks/subtasksSlice";

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

const Task = ({
    task
}) => {
    const subtasks = useSelector(selectSubtasks);
    const dispatch = useDispatch();

    const renderTaskStatus = (taskStatus) => {
        if (taskStatus === 'pending') {
            return <PendingActionsIcon titleAccess="Pending" />;
        } else if (taskStatus === 'completed') {
            return <TaskIcon titleAccess="Completed" />;
        } else if (taskStatus === 'overdue') {
            return <HourglassDisabled titleAccess="Overdue" />;
        }
    }

    useEffect(() => {
        dispatch(fetchSubtasksByTaskId(task.id));
    }, [dispatch, task.id])

    return (
        <Card className="task-container">
            <Box>
                <CardHeader 
                    titleTypographyProps={{ variant: 'taskTitle' }}
                    title={task.title} 
                    action={ <DeleteTaskButton task_id={task.id} /> }
                />
            </Box>
            <Divider />
            <Subtasks subtasks={subtasks} task_id={task.id} />
            <Divider />
            <CardBottom>
                {renderTaskStatus(task.status)}
                <DeadlineDate>{task.deadline_date}</DeadlineDate>
                <Link to={`tasks/${task.id}`}>View more</Link>
            </CardBottom>
        </Card>
    )
}

export default Task