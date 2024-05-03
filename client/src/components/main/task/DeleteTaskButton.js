import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTask } from "../../../services/tasksService";
import { addDays, formatDistanceToNow } from "date-fns";
import { dispatchFetchTasksByUserId } from "../../../utils/dispatchFetchTasksByUserId";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteTaskButton = ({
    task_id,
    deleted_at,
    setIsModalOpen,
    inTaskModal
}) => {
    const days_left = formatDistanceToNow(addDays(deleted_at, 30));
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deleteTask(task_id);
            dispatchFetchTasksByUserId(location.pathname);

            if (inTaskModal) {
                setIsModalOpen(false);
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <IconButton title={`Delete Forever (${days_left} left)`} onClick={handleDelete}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;