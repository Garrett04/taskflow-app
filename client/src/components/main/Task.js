import { Box, Card, CardContent, Divider, Grid, Stack, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CardBottom, CardHeader, TaskCard } from "./MainStyles";
import { renderTaskStatus } from "../../utils/renderTaskStatus";
import { format, formatDate, differenceInMinutes, differenceInDays, subDays, addDays, formatDistance, formatDistanceStrict, addMinutes, subMinutes, formatDistanceToNow } from "date-fns";
import MoveToTrashButton from "./MoveToTrashButton";
import RestoreTaskButton from "./RestoreTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import TaskModal from "../../pages/TaskModal";
import { useState } from "react";
import DeadlineDate from "./DeadlineDate";

const Task = ({
    task,
    page // Pass down by the pages
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    return (
        // Checks if it is not in the trash page then pass in the task.archived else null
        // Just to indicate that the task is going to be deleted or in the trash section
        // isAuthenticated was put in here to handle sample tasks
        <>
            <TaskCard 
                onClick={() => navigate(`task/${task.id}`)} 
                // To change the styling of the task when it is deleted and in a overdue tasks page.
                task_archived={(isAuthenticated && page === 'Overdue Tasks') && task.archived.toString()}
            >
                <Box>
                    <CardHeader
                        titleTypographyProps={{ variant: 'taskTitle' }}
                        title={task.title}
                        action={
                            <Stack flexDirection="row" alignItems="center"> 
                                {task.archived
                                && <RestoreTaskButton 
                                        task_id={task.id} 
                                        task_status={task.status} 
                                    />}
                                {task.archived
                                ? <DeleteTaskButton task_id={task.id} deleted_at={task.deleted_at} />
                                : <MoveToTrashButton task_id={task.id} />}
                            </Stack> 
                        }
                    />
                </Box>
                <Divider />
                <Subtasks task_id={task.id} archived={task.archived} task_status={task.status} />
                <Divider />
                <CardBottom>
                    {renderTaskStatus(task.status)}
                    <DeadlineDate deadline_date={task.deadline_date} />
                </CardBottom>
            </TaskCard>
        </>
    )
}

export default Task