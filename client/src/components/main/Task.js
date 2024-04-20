import { Box, Card, CardContent, Divider, Grid, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import { Link, useLocation } from "react-router-dom";
import { CardBottom, CardHeader, DeadlineDate, TaskCard } from "./MainStyles";
import { renderTaskStatus } from "../../utils/renderTaskStatus";
import { format, formatDate } from "date-fns";
import MoveToTrashButton from "./MoveToTrashButton";

const Task = ({
    task,
}) => {
    return (
        <TaskCard>
            <Box>
                <CardHeader
                    titleTypographyProps={{ variant: 'taskTitle' }}
                    title={task.title} 
                    action={ <MoveToTrashButton task_id={task.id} /> }
                />
            </Box>
            <Divider />
            <Subtasks task_id={task.id} />
            <Divider />
            <CardBottom>
                {renderTaskStatus(task.status)}
                <DeadlineDate>{task.deadline_date && format(new Date(task.deadline_date), "yyyy-MM-dd hh:mm aa")}</DeadlineDate>
            </CardBottom>
        </TaskCard>
    )
    
}

export default Task