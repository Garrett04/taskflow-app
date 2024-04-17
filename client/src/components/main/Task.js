import { Box, Card, CardContent, Divider, Grid, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import MuiCardHeader from '@mui/material/CardHeader';
import DeleteTaskButton from "./DeleteTaskButton";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";

const Task = ({
    task
}) => {
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

    const renderTaskStatus = (taskStatus) => {
        if (taskStatus === 'pending') {
            return <PendingActionsIcon titleAccess="Pending" />;
        } else if (taskStatus === 'completed') {
            return <TaskIcon titleAccess="Completed" />;
        } else if (taskStatus === 'overdue') {
            return <HourglassDisabled titleAccess="Overdue" />;
        }
    }

    return (
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
    )
}

export default Task