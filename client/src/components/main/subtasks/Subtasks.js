import { useDispatch, useSelector } from "react-redux";
import { getSubtasksError, getSubtasksStatus, selectSubtasks } from "../../../features/subtasks/taskSubtasksSlice";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { fetchSubtasksByTaskId } from "../../../services/subtasksService";
import AddSubtask from "./AddSubtask";
import Subtask from "./Subtask";


const Subtasks = ({ 
    task_id,
    inTaskModal, // Will always come only from TaskModal page
    task_status,
    archived
}) => {
    const subtasks = useSelector(selectSubtasks);
    const subtasksStatus = useSelector(getSubtasksStatus);
    const subtasksError = useSelector(getSubtasksError);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchSubtasksByTaskId(task_id));
    }, [dispatch, task_id])

    const renderSubtask = () => {
        const subtasksByTaskId = subtasks[task_id];

        if (subtasksByTaskId?.length > 0) {
            return subtasksByTaskId.map(subtask => (
                <div key={subtask.id}>
                    <Subtask 
                        task_id={task_id} 
                        subtask={subtask} 
                        archived={archived} 
                        task_status={task_status} 
                        inTaskModal={inTaskModal}
                    />
                </div>
            ))
        } else if (subtasksByTaskId?.length < 1 && task_status !== 'overdue' && !archived) {
            return subtasksError;
        }
    }

    let content;
    if (subtasksStatus === 'pending') {
        content = 'Loading...';
    } else if (subtasksStatus === 'fulfilled' || subtasks) {
        content = renderSubtask();
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexFlow: 'column', 
                gap: '1.2rem', 
                margin: '1rem 0',
                justifyContent: 'center'
            }}
        >
            {inTaskModal 
            ? <Box 
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        overflowY: 'auto',
                        maxHeight: '20rem',
                        overflowX: 'hidden',
                        gap: '1.2rem',
                    }}
                >
                    {content}
                </Box>
            : content}
            {inTaskModal 
            && <AddSubtask task_id={task_id} task_status={task_status} archived={archived} />}
        </Box>
    )
}

export default Subtasks;