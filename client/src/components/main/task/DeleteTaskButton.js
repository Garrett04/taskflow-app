import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTask, fetchTasksByUserId } from "../../../services/tasksService";
import { useDispatch } from "react-redux";
import { addDays, addMinutes, formatDistanceToNow } from "date-fns";
import { dispatchFetchTasksByUserId } from "../../../utils/dispatchFetchTasksByUserId";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteTaskButton = ({
    task_id,
    deleted_at,
    setIsModalOpen,
    inTaskModal
}) => {
    const dispatch = useDispatch();
    const days_left = formatDistanceToNow(addDays(deleted_at, 20));
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deleteTask(task_id);
            // dispatch(fetchTasksByUserId({ status: 'idle', archived: false }));
            dispatchFetchTasksByUserId(location.pathname);

            if (inTaskModal) {
                setIsModalOpen(false);
                navigate(-1);
            }
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