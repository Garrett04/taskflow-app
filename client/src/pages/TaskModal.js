import { Box, Card, Divider, Input, Modal } from "@mui/material"
import DeleteTaskButton from "../components/main/DeleteTaskButton"
import Subtasks from "../components/main/Subtasks"
import { CardBottom, CardHeader, DeadlineDate, ModalBox, TaskTitle } from "../components/main/MainStyles"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskError, getTaskStatus, selectTask } from "../features/tasks/taskSlice"
import { useNavigate, useParams } from "react-router-dom"
import { fetchTaskById } from "../services/tasksService"
import { renderTaskStatus } from "../utils/renderTaskStatus"
import AddSubtask from "../components/main/AddSubtask"


const TaskModal = () => {
    const task = useSelector(selectTask);
    const taskStatus = useSelector(getTaskStatus);
    const taskError = useSelector(getTaskError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const { id } = useParams();

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
            navigate('/');
        }
    };

    useEffect(() => {
        dispatch(fetchTaskById(id));
    }, [dispatch, id])

    const renderTask = () => (
        <Card className="task-container">
            <Box>
                <TaskTitle
                    value={task.title} 
                    action={ <DeleteTaskButton task_id={task.id} /> }
                />
            </Box>
            <Divider />
            <Subtasks task_id={task.id} />
            <AddSubtask />
            <Divider />
            <CardBottom>
                {renderTaskStatus(task.status)}
                <DeadlineDate>{task.deadline_date}</DeadlineDate>
            </CardBottom>
        </Card>
    )

    let content;
    if (taskStatus === 'pending') {
        content = 'Loading...';
    } else if (taskStatus === 'fulfilled') {
        content = renderTask();
    } else if (taskStatus === 'rejected') {
        content = taskError;
    }

    return (
        <Modal 
            open={open}
            onClose={handleClose}
        >
            <ModalBox>
                {content}
            </ModalBox>
        </Modal> 
    )
}

export default TaskModal