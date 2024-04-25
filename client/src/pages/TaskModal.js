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
                        disabled={task.archived || task.status === 'overdue'}
                    />
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
                        ? <DeadlineDate deadline_date={task.deadline_date} />
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