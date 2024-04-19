import { IconButton } from "@mui/material";
import { deleteSubtask, fetchSubtasksByTaskId } from "../../services/subtasksService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const DeleteSubtaskButton = ({
    // task_id,
    id
}) => {
    const dispatch = useDispatch();
    const task_id = useParams().id;

    const handleClick = async (e) => {
        e.stopPropagation();
        try {
            await deleteSubtask({ task_id, id });
    
            dispatch(fetchSubtasksByTaskId(task_id));
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <IconButton onClick={handleClick}>
            <DeleteForeverIcon />
        </IconButton>
    )
}

export default DeleteSubtaskButton;