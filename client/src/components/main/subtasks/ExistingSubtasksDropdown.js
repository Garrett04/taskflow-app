import { FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubtasksError, getUserSubtasksStatus, selectUserSubtasks } from "../../../features/subtasks/userSubtasksSlice";
import { useEffect, useState } from "react";
import { fetchSubtasksByUserId } from "../../../services/subtasksService";


const ExistingSubtasksDropdown = ({
    task_id,
    title,
    setTitle,
    description,
    setDescription,
    existingSubtaskTitle,
    handleChange
}) => {
    const userSubtasks = useSelector(selectUserSubtasks);
    const userSubtasksStatus = useSelector(getUserSubtasksStatus);
    const userSubtasksError = useSelector(getUserSubtasksError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubtasksByUserId(task_id));
    }, [dispatch, task_id]);

    const renderSubtaskOptions = () => {
        return userSubtasks.map(({id, subtask_title, subtask_description}) => (
            <MenuItem 
                key={id}
                value={{ subtask_title, subtask_description }}
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'start',
                    overflowWrap: 'break-word',
                    textWrap: 'wrap'
                }}
            >
                <Typography variant="body1">
                    {subtask_title}
                </Typography>
                <Typography variant="body2">
                    {subtask_description}
                </Typography>
            </MenuItem>
        ))
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="existing-subtask">Select Existing Subtask</InputLabel>
            <Select
                labelId="existing-subtask"
                label="existing-subtask"
                value={userSubtasksStatus === 'pending' ? "loading" : existingSubtaskTitle}
                onChange={handleChange}
                name="existing-subtask"
                MenuProps={{
                    PaperProps: {
                        sx: {
                            width: '40%',
                        }
                    }
                }}
                disabled={userSubtasksStatus === 'pending'}
            >
                {/* Since the title should only be displayed in the select value */}
                {userSubtasksStatus === 'pending'
                 &&
                    (
                        <MenuItem value="loading">
                            <CircularProgress size={24} />
                        </MenuItem>
                    )
                }
                <MenuItem value={existingSubtaskTitle} sx={{ display: 'none' }}>{existingSubtaskTitle}</MenuItem>
                {renderSubtaskOptions()}
            </Select>
        </FormControl>
    )
}

export default ExistingSubtasksDropdown;