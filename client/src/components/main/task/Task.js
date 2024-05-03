import { Box, Divider, Typography } from "@mui/material"
import Subtasks from "../subtasks/Subtasks";
import { useLocation, useNavigate } from "react-router-dom";
import { CardBottom, TaskCard, TaskHeader, TaskHeaderButtonGroup } from "../MainStyles";
import { renderTaskStatus } from "../../../utils/renderTaskStatus";
import MoveToTrashButton from "./MoveToTrashButton";
import RestoreTaskButton from "./RestoreTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import DeadlineDate from "./DeadlineDate";

const Task = ({
    task,
    sort,
    order,
    setIsModalOpen
}) => {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const handleOpen = (task_id) => {
        // open is changed to true to prevent another dispatch of fetchTasksByUserId
        // and open the TaskModal
        setIsModalOpen(true);

        // passing in the sort and order option to the task modal route 
        // so that sortBy and orderBy displays the same options
        // instead of going to its default state.
        navigate(`task/${task_id}`, { 
            state: { 
                sort, 
                order,
            },
        })   
    }

    return (
        // Checks if it is not in the trash page then pass in the task.archived else null
        // Just to indicate that the task is going to be deleted or in the trash section
        <>
            <TaskCard 
                onClick={() => handleOpen(task.id)} 
                // To change the styling of the task 
                // when it is deleted and in a overdue tasks page or completed tasks page.
                task_archived={
                    (pathname.includes('/overdue-tasks') || pathname.includes('/completed-tasks'))
                        ? task.archived.toString() 
                        : null
                }
                data-testid="task-card"
            >
                <Box>
                    <TaskHeader>
                        <Typography width="75%" variant="taskTitle">
                            {task.title}
                        </Typography>
                        <TaskHeaderButtonGroup> 
                            {task.archived
                            && <RestoreTaskButton 
                                    task_id={task.id} 
                                    task_status={task.status} 
                                />}
                            {task.archived
                            ? <DeleteTaskButton task_id={task.id} deleted_at={task.deleted_at} />
                            : <MoveToTrashButton task_id={task.id} />}
                        </TaskHeaderButtonGroup>
                    </TaskHeader> 
                </Box>
                <Divider/>
                {/* Subtasks component renders all subtasks associated by the task id */}
                <Subtasks task_id={task.id} archived={task.archived} task_status={task.status} />
                <Divider/>
                <CardBottom>
                    {renderTaskStatus(task.status)}
                    {/* DeadlineDate displays the deadline date if present */}
                    <DeadlineDate task_status={task.status} deadline_date={task.deadline_date} />
                </CardBottom>
            </TaskCard>
        </>
    )
}

export default Task