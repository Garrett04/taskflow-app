import { Box, Card, CardContent, Divider, Grid, Stack, Typography, styled } from "@mui/material"
import Subtasks from "./Subtasks"
import { Link, useLocation } from "react-router-dom";
import { CardBottom, CardHeader, DeadlineDate, TaskCard } from "./MainStyles";
import { renderTaskStatus } from "../../utils/renderTaskStatus";
import { format, formatDate, differenceInMinutes, differenceInDays, subDays, addDays, formatDistance, formatDistanceStrict, addMinutes, subMinutes, formatDistanceToNow } from "date-fns";
import MoveToTrashButton from "./MoveToTrashButton";
import RestoreTaskButton from "./RestoreTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import TaskModal from "../../pages/TaskModal";
import { useState } from "react";

const Task = ({
    task,
    page // Pass down by the pages
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        // Checks if it is not in the trash page then pass in the task.archived else null
        // Just to indicate that the task is going to be deleted or in the trash section
        // isAuthenticated was put in here to handle sample tasks
        <>
            <TaskCard task_archived={isAuthenticated && page !== 'Trash' ? task.archived.toString() : null}>
                <Box>
                    <CardHeader
                        titleTypographyProps={{ variant: 'taskTitle' }}
                        title={task.title}
                        action={
                            <Stack flexDirection="row" alignItems="center"> 
                                {page === 'Trash' 
                                && <RestoreTaskButton 
                                        task_id={task.id} 
                                        task_status={task.status} 
                                    />}
                                {page !== 'Trash' 
                                ? <MoveToTrashButton task_id={task.id} />
                                : <DeleteTaskButton task_id={task.id} deleted_at={task.deleted_at} />}
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
        </>
    )
}

export default Task