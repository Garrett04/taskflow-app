import { IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done';

const EditSubtaskButton = ({
    taskId,
    id,
    task_status,
    archived,
    isEditMode,
    setIsEditMode,
    handleSubtaskUpdate
}) => {
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    return (
        <>
        {!isEditMode 
        ? (
            <IconButton onClick={toggleEditMode}>
                <Edit titleAccess="Edit Subtask" /> 
            </IconButton>
            )
        : (
            <IconButton onClick={(e) => handleSubtaskUpdate(e, id)}>
                <DoneIcon titleAccess="Done" />
            </IconButton>
        )}
        </>
    )
}

export default EditSubtaskButton;