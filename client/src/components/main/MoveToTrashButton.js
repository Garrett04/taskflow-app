import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { fetchTasksByUserId, updateTaskArchived } from '../../services/tasksService';
import { useDispatch } from 'react-redux';
import { handleTaskExpand } from '../../utils/handleTaskExpand';

// it just updates the task status to deleted in the database
const MoveToTrashButton = ({
    task_id,
}) => {
    const dispatch = useDispatch();

    const handleArchive = async (e) => {
        handleTaskExpand(e);
        try {
            await updateTaskArchived({ task_id, archived: true});

            dispatch(fetchTasksByUserId()); // To update tasks state
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <IconButton title='Move to trash' onClick={handleArchive}>
            <DeleteIcon />
        </IconButton>
    )
}

export default MoveToTrashButton;