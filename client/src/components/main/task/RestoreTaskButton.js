import { IconButton } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { updateTaskArchived } from "../../../services/tasksService";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { restoreTask } from "../../../features/tasks/tasksSlice";

const RestoreTaskButton = ({
    task_id,
    inTaskModal,
    setIsModalOpen
}) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleRestore = async (e) => {
        e.stopPropagation();
        try {
            await updateTaskArchived({ 
                task_id, 
                archived: false
            });

            // dispatch(fetchTasksByUserId());
            // dispatchFetchTasksByUserId(location.pathname);

            dispatch(restoreTask({ id: task_id, pathname }));

            if (inTaskModal) {
                setIsModalOpen(false);
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
      <IconButton title="Restore Task" onClick={handleRestore}>
        <RestoreIcon />
      </IconButton>
    )
}

export default RestoreTaskButton;