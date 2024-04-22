import { IconButton } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { fetchTasksByUserId, updateTaskArchived } from "../../services/tasksService";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { dispatchFetchTasksByUserId } from "../../utils/dispatchFetchTasksByUserId";

const RestoreTaskButton = ({
    task_id,
    task_status
}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleRestore = async (e) => {
        e.stopPropagation();
        try {
            await updateTaskArchived({ 
                task_id, 
                archived: false
            });

            // dispatch(fetchTasksByUserId());
            dispatchFetchTasksByUserId(location.pathname);
        } catch (err) {
            console.log(err);
        }
    }

    return (
      <IconButton title="Restore Task" onClick={handleRestore}>
        <RestoreIcon />
      </IconButton>
    )
}

export default RestoreTaskButton;