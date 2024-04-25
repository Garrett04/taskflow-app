import { Box, Divider, Stack } from "@mui/material"
import Subtasks from "../subtasks/Subtasks";
import { useLocation, useNavigate } from "react-router-dom";
import { CardBottom, CardHeader, TaskCard } from "../MainStyles";
import { renderTaskStatus } from "../../../utils/renderTaskStatus";
import MoveToTrashButton from "./MoveToTrashButton";
import RestoreTaskButton from "./RestoreTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../features/auth/authSlice";
import DeadlineDate from "./DeadlineDate";

const Task = ({
    task,
    page, // Pass down by the pages
    sort,
    order,
    setIsModalOpen
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const location = useLocation();

    const handleOpen = (task_id) => {
        // open is changed to true to prevent another dispatch of fetchTasksByUserId
        setIsModalOpen(true);
        navigate(`task/${task_id}`, { 
            state: { 
                sort, 
                order, 
                background: location,
            },
        })   
    }

    return (
        // Checks if it is not in the trash page then pass in the task.archived else null
        // Just to indicate that the task is going to be deleted or in the trash section
        // isAuthenticated was put in here to handle sample tasks
        <>
            <TaskCard 
                // storing  
                onClick={() => handleOpen(task.id)} 
                // To change the styling of the task when it is deleted and in a overdue tasks page.
                task_archived={(isAuthenticated && page === 'Overdue Tasks') ? task.archived.toString() : null}
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