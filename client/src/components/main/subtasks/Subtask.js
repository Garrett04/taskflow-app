import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubtasksError, selectSampleSubtasks } from "../../../features/subtasks/subtasksSlice";
import { selectIsAuthenticated } from "../../../features/auth/authSlice";
import { useTheme } from "@emotion/react";
import { Box, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import DeleteSubtaskButton from "./DeleteSubtaskButton";
import EditSubtaskButton from "./EditSubtaskButton";
import { fetchSubtasksByTaskId, updateSubtask } from "../../../services/subtasksService";
import { handleTaskExpand } from "../../../utils/handleTaskExpand";


const Subtask = ({
    subtask,
    task_id,
    archived,
    task_status,
    inTaskModal,
}) => {
    const theme = useTheme();
    const [editModeMap, setEditModeMap] = useState({});
    const [title, setTitle] = useState({});
    const [description, setDescription] = useState({});
    const [formData, setFormData] = useState({});
    
    const dispatch = useDispatch();

    const updateSubtaskChecked = async (subtaskId, checked) => {
        try {
            // Incase the user removes the disabled property of the checkbox in the dev tools
            if (archived || task_status === 'overdue') {
                return;
            }

            const data = { task_id, id: subtaskId, checked: !checked };
            const updatedSubtask = await updateSubtask(data);

            dispatch(fetchSubtasksByTaskId(task_id));
            
        } catch (err) {
            console.log(err);
        }
    }
    

    const toggleEditMode = (subtask_id) => {
        setEditModeMap(prevState => ({
            ...prevState,
            [subtask_id]: !prevState[subtask_id]
        }));
    }

    const handleChange = (e, subtask_id) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

        return (
            <Stack
                direction="row" 
                alignItems="flex-start"
                marginLeft="1rem"
                key={subtask.id}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary" 
                            checked={subtask.checked}
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    '& .MuiSvgIcon-root': { 
                                        fontSize: '1.3rem',
                                        marginTop: '-1px'
                                    }
                                },
                                margin: '1.4rem 0'
                            }}
                            onChange={() => updateSubtaskChecked(subtask.id, subtask.checked)}
                            disabled={archived || task_status === 'overdue'}
                        />
                    } 
                    onClick={handleTaskExpand}
                />
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexFlow: 'row nowrap',
                        width: '100%'
                    }}
                >
                    <Box>
                        <TextField
                            sx={{ 
                                margin: '1rem 0',
                            }}
                            value={subtask.title}
                            label="Subtask Title"
                            name="title"
                            InputProps={{
                                readOnly: editModeMap[subtask.id],
                            }}
                            variant={editModeMap[subtask.id] ? "outlined" : "filled"}
                            fullWidth
                        />
                        <TextField
                            value={subtask.description}
                            label="Subtask Description"
                            name="description"
                            InputProps={{
                                readOnly: editModeMap[subtask.id]
                            }}
                            variant={editModeMap[subtask.id] ? "outlined" : "filled"}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Box>
                    <Box
                        sx={{ margin: '1rem 0' }}
                    >
                        <DeleteSubtaskButton
                            taskId={subtask.task_id} 
                            id={subtask.id} 
                            task_status={task_status}
                            archived={archived} 
                        />
                        {inTaskModal 
                        && 
                        <EditSubtaskButton
                            taskId={subtask.task_id}
                            id={subtask.id}
                            task_status={task_status}
                            archived={archived}
                            setIsEditMode={() => toggleEditMode(subtask.id)}
                        />}
                    </Box>
                </Box>
            </Stack>
        )
    
}

export default Subtask;