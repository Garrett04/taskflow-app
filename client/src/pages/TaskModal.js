import { Box, Card, Collapse, Divider, Input, Modal } from "@mui/material"
import Subtasks from "../components/main/Subtasks"
import { CardBottom, CardHeader, DeadlineDate, ModalBox, TaskCard, TaskTitle } from "../components/main/MainStyles"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskError, getTaskStatus, selectTask } from "../features/tasks/taskSlice"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { fetchTaskById, fetchTasksByUserId, updateTask } from "../services/tasksService"
import { renderTaskStatus } from "../utils/renderTaskStatus"
import AddSubtask from "../components/main/AddSubtask"

import DeadlineDatePicker from "../components/main/DeadlineDatePicker"
import MoveToTrashButton from "../components/main/MoveToTrashButton"
import Tasks from "../components/main/Tasks"


const TaskModal = ({
}) => {
    const task = useSelector(selectTask);
    const taskStatus = useSelector(getTaskStatus);
    const taskError = useSelector(getTaskError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(true);

    const { id } = useParams();
    
    const [expand, setExpand] = useState(false);

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
            dispatch(fetchTasksByUserId());
            navigate(-1);
        }
    };

    useEffect(() => {
        dispatch(fetchTaskById(id));
    }, [dispatch, id])

    useEffect(() => {
        // to first set title to the existing title
        if (task.title) {
            setTitle(task.title);
        } else { // when creating a new task
            setTitle("");
        }
    }, [task.title])

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
                <Box>
                    <TaskTitle
                        value={title} 
                        action={ <MoveToTrashButton task_id={task.id} /> }
                        fullWidth
                        onChange={handleChange}
                        onKeyUp={updateTaskTitle}
                        error={!title}
                        placeholder="Task Title"
                    />
                </Box>
                <Collapse
                    in={task.title ? true : expand} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <Divider />
                    <Subtasks inTaskModal={true} task_id={task.id} />
                    <Divider />
                    <CardBottom>
                        {renderTaskStatus(task.status)}
                        <DeadlineDatePicker 
                            id={task.id}
                            deadline_date={task.deadline_date} 
                        />
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
                open={open}
                onClose={handleClose}
            >
                <ModalBox>
                    {content}
                </ModalBox>
            </Modal>
        </>
    )
}

export default TaskModal;