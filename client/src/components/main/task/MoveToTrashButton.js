import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, useTheme } from '@mui/material';
import { updateTaskArchived } from '../../../services/tasksService';
import { useDispatch } from 'react-redux';
import { handleTaskExpand } from '../../../utils/handleTaskExpand';
import { useLocation, useNavigate } from 'react-router-dom';
import { moveTaskToTrash } from '../../../features/tasks/tasksSlice';

// it just updates the task status to deleted in the database
const MoveToTrashButton = ({
    task_id,
    inTaskModal,
    setIsModalOpen
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleArchive = async (e) => {
        handleTaskExpand(e);
        try {
            const archivedTask = await updateTaskArchived({ task_id, archived: true});

            // dispatch(fetchTasksByUserId()); // To update tasks state
            // dispatchFetchTasksByUserId(location.pathname);

            // console.log(archivedTask);

            dispatch(moveTaskToTrash({ id: task_id, deleted_at: archivedTask.deleted_at, pathname }));

            if (inTaskModal) {
                setIsModalOpen(false);
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <IconButton 
            data-testid="trash-button" 
            title='Move to trash' 
            onClick={handleArchive}
            sx={{
                width: inTaskModal ? '10%' : 'auto',
                [theme.breakpoints.up('xl')]: {
                    width: inTaskModal ? '5%' : 'auto'
                }
            }}
        >
            <DeleteIcon />
        </IconButton>
    )
}

export default MoveToTrashButton;