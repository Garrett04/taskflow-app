import { IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit'

const EditSubtaskButton = ({
    taskId,
    id,
    task_status,
    archived,
    isEditMode,
    setIsEditMode
}) => {
    

    return (
        <IconButton onClick={setIsEditMode}>
            <Edit />
        </IconButton>
    )
}

export default EditSubtaskButton;