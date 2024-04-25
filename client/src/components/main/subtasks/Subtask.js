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
import { dispatchFetchTasksByUserId } from '../../../utils/dispatchFetchTasksByUserId';
import { useLocation } from "react-router-dom";


const Subtask = ({
    subtask,
    task_id,
    archived,
    task_status,
    inTaskModal,
}) => {
    const theme = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(subtask.title);
    const [description, setDescription] = useState(subtask.description);
    
    const dispatch = useDispatch();
    const location = useLocation();

    const updateSubtaskChecked = async (subtask_id, checked) => {
        try {
            // Incase the user removes the disabled property of the checkbox in the dev tools
            if (archived || task_status === 'overdue') {
                return;
            }

            const data = { task_id, id: subtask_id, checked: !checked };
            const updatedSubtask = await updateSubtask(data);

            dispatch(fetchSubtasksByTaskId(task_id));

            // console.log(updatedSubtask.task_status, task_status);

            // if updatedTaskStatus is different than the previous task status
            // then dispatchFetchTasksByUserId to update state.
            if (updatedSubtask.task_status !== task_status) {
                dispatchFetchTasksByUserId(location.pathname);
            }
            
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleSubtaskUpdate = async (e, subtask_id) => {
        e.preventDefault();
        try {
            const data = { task_id, id: subtask_id, title, description };

            const updatedSubtask = await updateSubtask(data);

            // console.log(updatedSubtask);

            dispatch(fetchSubtasksByTaskId(task_id));
            setIsEditMode(false);
        } catch (err) {
            console.log(err);
        }
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    }

    return (
        <Stack
            direction="row" 
            alignItems="flex-start"
            margin="1rem 0 1rem 1rem"
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
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <TextField
                        sx={{ 
                            margin: '1rem 0',
                        }}
                        value={title}
                        label="Subtask Title"
                        name="title"
                        InputProps={{
                            readOnly: !isEditMode,
                        }}
                        variant={!isEditMode ? "filled" : "outlined"}
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        value={description}
                        label="Subtask Description"
                        name="description"
                        InputProps={{
                            readOnly: !isEditMode,
                        }}
                        variant={!isEditMode ? "filled" : "outlined"}
                        fullWidth
                        multiline
                        rows={3}
                        onChange={handleChange}
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
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        handleSubtaskUpdate={handleSubtaskUpdate}
                    />}
                </Box>
            </Box>
        </Stack>
    )
}

export default Subtask;