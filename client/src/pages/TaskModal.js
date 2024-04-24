import { Box, Card, Collapse, Divider, Input, Modal } from "@mui/material"
import Subtasks from "../components/main/Subtasks"
import { CardBottom, CardHeader, ModalBox, TaskCard, TaskTitle } from "../components/main/MainStyles"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskError, getTaskStatus, selectTask } from "../features/tasks/taskSlice"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { fetchTaskById, fetchTasksByUserId, updateTask } from "../services/tasksService"
import { renderTaskStatus } from "../utils/renderTaskStatus"
import AddSubtask from "../components/main/AddSubtask"

import DeadlineDatePicker from "../components/main/DeadlineDatePicker"
import MoveToTrashButton from "../components/main/MoveToTrashButton"
import Tasks from "../components/main/Tasks"
import DeadlineDate from "../components/main/DeadlineDate"
import { dispatchFetchTasksByUserId } from "../utils/dispatchFetchTasksByUserId"


const TaskModal = () => {
    const task = useSelector(selectTask);
    const taskStatus = useSelector(getTaskStatus);
    const taskError = useSelector(getTaskError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(true);
    const { id } = useParams();
    const [expand, setExpand] = useState(false);
    const location = useLocation();

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
            
            // if when adding task and after closing the modal
            // the location.state.from will be present
            // then navigate to home page
            // else when the task has not been added and just opened
            // then navigate to the page before.
            if (location.state?.from) {
                console.log("hello 1");
                // update tasks state after adding task.
                dispatchFetchTasksByUserId(location.pathname);
                navigate('/', { state: { sort: location.state.sort, order: location.state.order }});
            } else {
                console.log("hello 2");
                navigate(-1, { state: { sort: location.state.sort, order: location.state.order }});
            }
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
                        {task.archived || task.status === 'overdue'
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