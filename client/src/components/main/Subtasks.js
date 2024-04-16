import { useDispatch, useSelector } from "react-redux";
import { fetchSampleSubtasks, getSubtasksError, getSubtasksStatus, selectSubtasks } from "../../features/subtasks/subtasksSlice";
import { useEffect } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";


const Subtasks = ({ task_id }) => {
    const subtasks = useSelector(selectSubtasks);
    const subtasksStatus = useSelector(getSubtasksStatus);
    const subtasksError = useSelector(getSubtasksError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSampleSubtasks());
    }, [dispatch])
    

    const renderSubtasks = () => {
        const foundSubtask = subtasks.filter(subtask => subtask.task_id === task_id);
    
        return foundSubtask.map(subtask => (
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="flex-start"
                marginLeft="1rem"
            >
                <FormControlLabel 
                    control={<Checkbox color="secondary" defaultChecked={subtask.checked} />} 
                    label={
                        <Typography variant="h6">
                            {subtask.title}
                        </Typography>
                    } 
                />
                <Typography variant="body1" marginLeft="2rem">
                    {subtask.description}
                </Typography>
            </Box>
        ))
    }

    let content;
    if (subtasksStatus === 'pending') {
        content = 'Loading...';
    } else if (subtasksStatus === 'fulfilled') {
        content = renderSubtasks();
    } else if (subtasksStatus === 'rejected') {
        content = subtasksError;
    }

    return (
        <FormGroup>
            {content}
        </FormGroup>
    )
}

export default Subtasks;