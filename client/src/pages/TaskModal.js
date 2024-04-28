import { Box, Collapse, Divider, Modal } from "@mui/material"
import Subtasks from "../components/main/subtasks/Subtasks"
import { CardBottom, ModalBox, TaskCard, TaskTitle } from "../components/main/MainStyles"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskError, getTaskStatus, selectTask } from "../features/tasks/taskSlice"
import { useLocation, useParams } from "react-router-dom"
import { fetchTaskById, updateTask } from "../services/tasksService"
import { renderTaskStatus } from "../utils/renderTaskStatus"
import DeadlineDatePicker from "../components/main/task/DeadlineDatePicker"
import MoveToTrashButton from "../components/main/task/MoveToTrashButton"
import DeadlineDate from "../components/main/task/DeadlineDate"
import RestoreTaskButton from "../components/main/task/RestoreTaskButton"
import DeleteTaskButton from "../components/main/task/DeleteTaskButton"
import { dispatchFetchTasksByUserId } from "../utils/dispatchFetchTasksByUserId"


const TaskModal = ({
    isModalOpen,
    setIsModalOpen,
    handleClose,
}) => {
    const task = useSelector(selectTask);
    const taskStatus = useSelector(getTaskStatus);
    const taskError = useSelector(getTaskError);
    const dispatch = useDispatch();
    
    const [title, setTitle] = useState("");
    
    const { id } = useParams();
    const [expand, setExpand] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/task')) {
            setIsModalOpen(true);
            dispatch(fetchTaskById(id));
        }
    }, [dispatch, id, location, setIsModalOpen, location.pathname])

    useEffect(() => {
        if (location.state?.isNewTask) { // when creating a new task
            setTitle("");
            setExpand(false);
        } else if (task.title) { // to first set title to the existing title
            setTitle(task.title);
        }
    }, [location.state?.isNewTask, task.title])

    const updateTaskTitle = async (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            // If title is removed it will alert user and not update task.
            if (!title) {
                window.alert('Please provide task title');
                return;           
            }
            try {
                const updatedTask = await updateTask({ id: id, title });
                console.log(updatedTask);

                setExpand(true);

                dispatchFetchTasksByUserId(location.pathname);
                
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        
        setTitle(value);
    }

    const renderTask = () => {
        return (
            <TaskCard>
                <Box
                    sx={{
                        display: 'flex'
                    }}
                >
                    <TaskTitle
                        value={title}
                        fullWidth
                        onChange={handleChange}
                        onKeyUp={updateTaskTitle}
                        error={!title}
                        placeholder="Task Title"
                        name="task-title"
                        disabled={task.archived || task.status === 'overdue'}
                    />
                    {task.archived
                    && <RestoreTaskButton 
                            task_id={task.id} 
                            task_status={task.status} 
                        />}
                    {task.archived
                    ? <DeleteTaskButton task_id={task.id} deleted_at={task.deleted_at} />
                    : <MoveToTrashButton task_id={task.id} />}
                </Box>
                <Collapse
                    in={task.title ? true : expand} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <Divider />
                    <Subtasks   
                        inTaskModal={true} 
                        task_id={task.id} 
                        task_status={task.status} 
                        archived={task.archived} 
                    />
                    <Divider />
                    <CardBottom>
                        {renderTaskStatus(task.status)}
                        {task.archived || task.status === 'overdue' || task.status === 'completed'
                        ? <DeadlineDate task_status={task.status} deadline_date={task.deadline_date} />
                        : <DeadlineDatePicker 
                            id={task.id}
                            deadline_date={task.deadline_date}
                          />
                        }
                    </CardBottom>
                </Collapse>
            </TaskCard>
        )     
    }

    let content;
    if (taskStatus === 'pending') {
        content = 'Loading...';
    } else if (taskStatus === 'fulfilled') {
        content = renderTask();
    } else if (taskStatus === 'rejected') {
        content = taskError;
    }

    return (
        <>
            <Modal 
                open={isModalOpen}
                onClose={(e) => handleClose(e, title, task.id)}
            >
                <ModalBox data-testid="task-modal">
                    {content}
                </ModalBox>
            </Modal>
        </>
    )
}

export default TaskModal;