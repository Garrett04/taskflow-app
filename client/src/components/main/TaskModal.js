import { Box, Collapse, Divider, Modal } from "@mui/material"
import Subtasks from "./subtasks/Subtasks"
import { CardBottom, ModalBox, TaskCard, TaskTitle } from "./MainStyles"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { updateTask } from "../../services/tasksService"
import { renderTaskStatus } from "../../utils/renderTaskStatus"
import DeadlineDatePicker from "./task/DeadlineDatePicker"
import MoveToTrashButton from "./task/MoveToTrashButton"
import DeadlineDate from "./task/DeadlineDate"
import RestoreTaskButton from "./task/RestoreTaskButton"
import DeleteTaskButton from "./task/DeleteTaskButton"
import { getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice"


const TaskModal = ({
    isModalOpen,
    setIsModalOpen,
    handleClose,
}) => {
    const { id } = useParams();
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);

    const [expand, setExpand] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const location = useLocation();

    const taskById = tasks.find(task => task.id === id);

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (location.pathname.includes('/task')) {
            setIsModalOpen(true);
            // dispatch(fetchTaskById(id));
        }
    }, [setIsModalOpen, location.pathname])

    useEffect(() => {
        if (tasksStatus === 'fulfilled') {
            setTitle(taskById?.title || "");
        }
        if (location.state?.isNewTask) {
            setExpand(false);
        }
    }, [tasksStatus, taskById?.title, location.state?.isNewTask]);

    const updateTaskTitle = async (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            // If title is removed it will alert user and not update task.
            if (!title) {
                window.alert('Please provide task title');
                setTitle(taskById.title);
                return;           
            }
            try {
                await updateTask({ id: id, title });

                setExpand(true);
                setUpdateSuccess(true);
                
            } catch (err) {
                throw err;
            }
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;

        setTitle(value);
    }

    const renderTask = () => {
        if (taskById) {
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
                            placeholder="Please provide a title for your task and press Enter"
                            name="task-title"
                            disabled={taskById.archived || taskById.status === 'overdue'}
                            color={updateSuccess ? "success" : "info"}
                        />
                        {taskById.archived
                        && <RestoreTaskButton 
                                task_id={taskById.id} 
                                task_status={tasks.status}
                                setIsModalOpen={setIsModalOpen}
                                inTaskModal
                            />}
                        {taskById.archived
                        ? <DeleteTaskButton 
                            task_id={taskById.id} 
                            deleted_at={taskById.deleted_at}
                            setIsModalOpen={setIsModalOpen}
                            inTaskModal 
                          />
                        : <MoveToTrashButton 
                            task_id={taskById.id} 
                            setIsModalOpen={setIsModalOpen}
                            inTaskModal  
                          />}
                    </Box>
                    <Collapse
                        in={taskById.title ? true : expand} 
                        timeout="auto" 
                        unmountOnExit
                    >
                        <Divider />
                        <Subtasks   
                            inTaskModal={true} 
                            task_id={taskById.id} 
                            task_status={taskById.status} 
                            archived={taskById.archived} 
                        />
                        <Divider />
                        <CardBottom>
                            {renderTaskStatus(taskById.status)}
                            {taskById.archived || taskById.status === 'overdue' || taskById.status === 'completed'
                            ? <DeadlineDate task_status={taskById.status} deadline_date={taskById.deadline_date} />
                            : <DeadlineDatePicker 
                                id={taskById.id}
                                deadline_date={taskById.deadline_date}
                              />
                            }
                        </CardBottom>
                    </Collapse>
                </TaskCard>
            )
        } else {
            return "Task not found by id"
        }   
    }

    let content;
    if (tasksStatus === 'fulfilled') {
        content = renderTask();
    } else if (tasksStatus === 'rejected') {
        content = tasksError;
    }

    return (
        <>
            <Modal 
                open={isModalOpen}
                onClose={(e) => handleClose(e, title, id)}
            >
                <ModalBox data-testid="task-modal">
                    {content}
                </ModalBox>
            </Modal>
        </>
    )
}

export default TaskModal;