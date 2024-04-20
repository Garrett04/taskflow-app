import { IconButton } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { fetchTasksByUserId, updateTaskArchived } from "../../services/tasksService";
import { useDispatch } from "react-redux";

const RestoreTaskButton = ({
    task_id,
    task_status
}) => {
    const dispatch = useDispatch();

    const handleRestore = async (e) => {
        e.stopPropagation();
        try {
            await updateTaskArchived({ 
                task_id, 
                archived: false
            });

            dispatch(fetchTasksByUserId());
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