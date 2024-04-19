import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteTask, fetchTasksByUserId } from '../../services/tasksService';
import { useDispatch } from 'react-redux';
import { handleTaskExpand } from '../../utils/handleTaskExpand';

// it just updates the task status to deleted in the database
const DeleteTaskButton = ({
    task_id
}) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        handleTaskExpand(e);
        try {
            await deleteTask(task_id);

            dispatch(fetchTasksByUserId()); // To update tasks state
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <IconButton title='Move to trash' onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteTaskButton;