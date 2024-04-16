import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteTask, fetchTasksByUserId } from '../../services/tasksService';
import { useDispatch } from 'react-redux';


const DeleteTaskButton = ({
    task_id
}) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const deletedTaskId = await deleteTask(task_id);

            dispatch(fetchTasksByUserId()); // To update tasks state
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <IconButton onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;