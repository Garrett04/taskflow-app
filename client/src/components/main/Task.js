import { Box, Card, CardContent, Divider, Grid, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import DeleteTaskButton from "./DeleteTaskButton";
import { Link } from "react-router-dom";
import { CardBottom, CardHeader, DeadlineDate, TaskCard } from "./MainStyles";
import { renderTaskStatus } from "../../utils/renderTaskStatus";


const Task = ({
    task,
}) => {
    return (
        <TaskCard >
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
                <Link to={`task/${task.id}`}>View more</Link>
            </CardBottom>
        </TaskCard>
    )
    
}

export default Task