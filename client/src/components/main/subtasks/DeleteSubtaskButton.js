import { IconButton } from "@mui/material";
import { deleteSubtask, fetchSubtasksByUserId } from "../../../services/subtasksService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { updateTaskStatus } from "../../../features/tasks/tasksSlice";
import { deleteSubtaskAction } from "../../../features/subtasks/taskSubtasksSlice";

const DeleteSubtaskButton = ({
    taskId,
    id,
    task_status,
    archived
}) => {
    const dispatch = useDispatch();
    const task_id = useParams().id || taskId;

    const handleClick = async (e) => {
        e.stopPropagation();
        try {
            const deletedSubtask = await deleteSubtask({ task_id, id });
    
            dispatch(deleteSubtaskAction({ task_id, id }));
    
            if (deletedSubtask.task_status !== task_status) {
                dispatch(updateTaskStatus({ id: task_id, task_status: deletedSubtask.task_status }));
            }

            dispatch(fetchSubtasksByUserId(task_id));
            
        } catch (err) {
            throw err;
        }
    }

    return (
        <IconButton title="Delete Subtask" onClick={handleClick} disabled={archived || task_status === 'overdue'}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteSubtaskButton;