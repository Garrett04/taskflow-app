import { IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done';

const EditSubtaskButton = ({
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
            <IconButton onClick={toggleEditMode} disabled={archived || task_status === 'overdue'}>
                <Edit titleAccess="Edit Subtask" /> 
            </IconButton>
            )
        : (
            <IconButton onClick={handleSubtaskUpdate}>
                <DoneIcon titleAccess="Done" />
            </IconButton>
        )}
        </>
    )
}

export default EditSubtaskButton;