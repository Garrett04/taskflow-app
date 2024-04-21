import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTask, fetchTasksByUserId } from "../../services/tasksService";
import { useDispatch } from "react-redux";

const DeleteTaskButton = ({
    task_id
}) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deleteTask(task_id);
            dispatch(fetchTasksByUserId());
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <IconButton title="Delete Forever" onClick={handleDelete}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;