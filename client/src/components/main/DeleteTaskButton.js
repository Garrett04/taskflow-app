import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTask, fetchTasksByUserId } from "../../services/tasksService";
import { useDispatch } from "react-redux";
import { addDays, addMinutes, formatDistanceToNow } from "date-fns";
import { dispatchFetchTasksByUserId } from "../../utils/dispatchFetchTasksByUserId";
import { useLocation } from "react-router-dom";

const DeleteTaskButton = ({
    task_id,
    deleted_at,
}) => {
    const dispatch = useDispatch();
    const days_left = formatDistanceToNow(addDays(deleted_at, 20));
    const location = useLocation();

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deleteTask(task_id);
            // dispatch(fetchTasksByUserId({ status: 'idle', archived: false }));
            dispatchFetchTasksByUserId(location.pathname);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <IconButton title={`Delete Forever (${days_left} left)`} onClick={handleDelete}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;