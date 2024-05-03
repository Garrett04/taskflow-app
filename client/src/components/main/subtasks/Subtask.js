import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import DeleteSubtaskButton from "./DeleteSubtaskButton";
import EditSubtaskButton from "./EditSubtaskButton";
import { fetchSubtasksByTaskId, fetchSubtasksByUserId, updateSubtask } from "../../../services/subtasksService";
import { handleTaskExpand } from "../../../utils/handleTaskExpand";
import { useLocation } from "react-router-dom";
import { updateTaskStatus } from "../../../features/tasks/tasksSlice";


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
    const [checked, setChecked] = useState(subtask.checked || false);
    
    const dispatch = useDispatch();
    const { pathname } = useLocation();


    const updateSubtaskChecked = async (subtask_id) => {
        try {
            setChecked(!checked);

            // Incase the user removes the disabled property of the checkbox in the dev tools
            if (archived || task_status === 'overdue') {
                return;
            }

            const data = { task_id, id: subtask_id, checked: !checked };
            const updatedSubtask = await updateSubtask(data);

            // update subtasks state
            // dispatch(fetchSubtasksByTaskId(task_id));

            // if updatedTaskStatus is different than the previous task status
            // then dispatchFetchTasksByUserId to update state.
            if (updatedSubtask.task_status !== task_status) {
                
                dispatch(fetchSubtasksByTaskId(task_id));

                dispatch(updateTaskStatus({ id: task_id, task_status: updatedSubtask.task_status, pathname }));
            }
            
        } catch (err) {
            throw err;
        }
    }
    
    
    const handleSubtaskUpdate = async (e, subtask_id) => {
        e.preventDefault();
        try {
            const data = { task_id, id: subtask_id, title, description };

            await updateSubtask(data);

            setIsEditMode(false);

            dispatch(fetchSubtasksByTaskId(task_id));

            dispatch(fetchSubtasksByUserId(task_id));
        } catch (err) {
            throw err;
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

    const renderSubtaskDataFields = () => {
        if (isEditMode) {
            return (
                <Box
                    sx={{
                        width: '85%'
                    }}
                >
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
            )
        } else {
            return (
                <Box
                    sx={{
                        textAlign: 'start',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        overflowWrap: 'break-word',
                        width: '85%',
                    }}
                >
                    <Typography 
                        variant="h6" 
                        data-testid="subtask-title"
                        sx={{
                            fontWeight: 'bold',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '1.2rem'
                            }
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        data-testid="subtask-description"
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '1rem'
                            }
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            )
        }
    }

    return (
        <Stack
            direction="row"
            flexWrap="nowrap" 
            alignItems="center"
            width='100%'
            key={subtask.id}
            data-testid="subtask-container"
        >
            <FormControlLabel
                control={
                    <Checkbox
                        color="success"
                        checked={checked}
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                '& .MuiSvgIcon-root': { 
                                    fontSize: '1.3rem',
                                    marginTop: '-1px'
                                }
                            },
                            marginLeft: '1rem',
                            color: theme.palette.indigo.contrastText
                        }}
                        onChange={() => updateSubtaskChecked(subtask.id)}
                        disabled={archived || task_status === 'overdue'}
                        size="small"
                    />
                } 
                onClick={handleTaskExpand}
            />
            <Box
                sx={{
                    display: 'inline-flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: inTaskModal ? "90%" : "80%",
                    [theme.breakpoints.down('sm')]: {
                        flexFlow: 'column wrap',
                        alignItems: 'start',
                    }
                }}
            >
                {renderSubtaskDataFields()}
                <Box
                    sx={{  
                        display: 'flex',
                        flexFlow: 'column wrap',
                        [theme.breakpoints.down('sm')]: {
                            flexFlow: 'row nowrap',
                            justifyContent: 'center',
                            width: '85%'
                        }
                    }}
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
                        handleSubtaskUpdate={(e) => handleSubtaskUpdate(e, subtask.id)}
                    />}
                </Box>
            </Box>
        </Stack>
    )
}

export default Subtask;