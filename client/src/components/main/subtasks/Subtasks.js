import { useDispatch, useSelector } from "react-redux";
import { getSubtasksError, getSubtasksStatus, selectSubtasks } from "../../../features/subtasks/taskSubtasksSlice";
import { useEffect } from "react";
import { Box, useTheme, LinearProgress } from "@mui/material";
import { fetchSubtasksByTaskId } from "../../../services/subtasksService";
import AddSubtask from "./AddSubtask";
import Subtask from "./Subtask";

const Subtasks = ({ 
    task_id,
    inTaskModal, // Will always come only from TaskModal page
    task_status,
    archived
}) => {
    const theme = useTheme();
    const subtasks = useSelector(selectSubtasks);
    const subtasksStatus = useSelector(getSubtasksStatus);
    const subtasksError = useSelector(getSubtasksError);
    
    const dispatch = useDispatch();
    
    // for every task it will dispatch fetchSubtasksByTaskId
    useEffect(() => {
        console.log('hello');
        dispatch(fetchSubtasksByTaskId(task_id));
    }, [dispatch, task_id])

    const renderSubtask = () => {
        // since each tasks subtasks is stored in an object with task id as the key in the redux state
        // and the value is the subtasks array, we access it like so.
        const subtasksByTaskId = subtasks[task_id];

        // if the subtasks are present
        if (subtasksByTaskId?.length > 0) {
            // for every subtask render the Subtask component
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
        // Else if the subtasks are not present and task status is not overdue and archived.
        // meaning for tasks with a status of overdue and archived should not show "Add new subtasks" message. 
        } else if (subtasksByTaskId?.length < 1 && task_status !== 'overdue' && !archived) {
            return subtasksError;
        }
    }

    let content;
    if (subtasksStatus === 'pending') {
        content = <LinearProgress color="inherit" sx={{ width: '90%', margin: 'auto' }} />;
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
                        [theme.breakpoints.down('sm')]: {
                            maxHeight: '18rem'
                        }
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