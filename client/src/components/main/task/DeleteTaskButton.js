import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTask } from "../../../services/tasksService";
import { addDays, formatDistanceToNow } from "date-fns";
import { dispatchFetchTasksByUserId } from "../../../utils/dispatchFetchTasksByUserId";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSubtasksByUserId } from "../../../services/subtasksService";
import { useDispatch } from "react-redux";

const DeleteTaskButton = ({
    task_id,
    deleted_at,
    setIsModalOpen,
    inTaskModal
}) => {
    const days_left = formatDistanceToNow(addDays(deleted_at, 20));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            throw err;
        }
    }
    
    return (
        <IconButton title={`Delete Forever (${days_left} left)`} onClick={handleDelete}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;