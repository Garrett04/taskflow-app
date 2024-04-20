import { Box, Card, CardContent, Divider, Grid, Stack, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import { Link, useLocation } from "react-router-dom";
import { CardBottom, CardHeader, DeadlineDate, TaskCard } from "./MainStyles";
import { renderTaskStatus } from "../../utils/renderTaskStatus";
import { format, formatDate } from "date-fns";
import MoveToTrashButton from "./MoveToTrashButton";
import RestoreTaskButton from "./RestoreTaskButton";

const Task = ({
    task,
    page // Pass down by the pages
}) => {
    return (
        // Checks if it is not in the trash page then pass in the task.archived else null
        // Just to indicate that the task is going to be deleted or in the trash section
        <TaskCard task_archived={page !== 'Trash' ? task.archived.toString() : null}>
            <Box>
                <CardHeader
                    titleTypographyProps={{ variant: 'taskTitle' }}
                    title={task.title} 
                    action={
                        <Stack flexDirection="row" alignItems="center"> 
                            {page === 'Trash' && <RestoreTaskButton 
                                                    task_id={task.id} 
                                                    task_status={task.status} 
                                                />}
                            <MoveToTrashButton task_id={task.id} />
                        </Stack> 
                    }
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