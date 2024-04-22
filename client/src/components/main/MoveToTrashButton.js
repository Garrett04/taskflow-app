import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { fetchTasksByUserId, updateTaskArchived } from '../../services/tasksService';
import { useDispatch } from 'react-redux';
import { handleTaskExpand } from '../../utils/handleTaskExpand';
import { dispatchFetchTasksByUserId } from '../../utils/dispatchFetchTasksByUserId';
import { useLocation } from 'react-router-dom';

// it just updates the task status to deleted in the database
const MoveToTrashButton = ({
    task_id,
}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleArchive = async (e) => {
        handleTaskExpand(e);
        try {
            await updateTaskArchived({ task_id, archived: true});

            // dispatch(fetchTasksByUserId()); // To update tasks state
            dispatchFetchTasksByUserId(location.pathname);
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