import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserSubtasks } from "../../../features/subtasks/userSubtasksSlice";
import { useEffect } from "react";
import { fetchSubtasksByUserId } from "../../../services/subtasksService";


const ExistingSubtasksDropdown = ({
    task_id,
    existingSubtaskTitle,
    handleChange
}) => {
    const userSubtasks = useSelector(selectUserSubtasks);
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
                    textWrap: 'wrap',
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

    if (userSubtasks.length > 0) {
        return (
            <FormControl fullWidth>
                <InputLabel id="existing-subtask">Existing Subtask</InputLabel>
                <Select
                    labelId="existing-subtask"
                    label="existing-subtask"
                    value={existingSubtaskTitle}
                    onChange={handleChange}
                    name="existing-subtask"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                width: '40%',
                            }
                        }
                    }}
                >
                    {/* Since the title should only be displayed in the select value */}
                    <MenuItem value={existingSubtaskTitle} sx={{ display: 'none' }}>{existingSubtaskTitle}</MenuItem>
                    {renderSubtaskOptions()}
                </Select>
            </FormControl>
        )
    }
}

export default ExistingSubtasksDropdown;