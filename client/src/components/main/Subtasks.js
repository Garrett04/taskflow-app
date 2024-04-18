import { useDispatch, useSelector } from "react-redux";
import { fetchSampleSubtasks, getSubtasksError, getSubtasksStatus, selectSubtasks } from "../../features/subtasks/subtasksSlice";
import { useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from "../../features/auth/authSlice";
import { fetchSubtasksByTaskId } from "../../services/subtasksService";
import { useParams } from "react-router-dom";


const Subtasks = ({ 
    subtasks,
    task_id
}) => {
    const theme = useTheme();
    const subtasksStatus = useSelector(getSubtasksStatus);
    const subtasksError = useSelector(getSubtasksError);

    const renderSubtasks = () => {
        const foundSubtasks = subtasks.filter(subtask => subtask.task_id === task_id);

        return foundSubtasks.map(subtask => (
            <Stack 
                direction="column" 
                alignItems="flex-start"
                marginLeft="1rem"
                key={subtask.id}
            >
                <FormControlLabel 
                    control={
                        <Checkbox 
                            color="secondary" 
                            defaultChecked={subtask.checked}
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    '& .MuiSvgIcon-root': { 
                                        fontSize: '1.3rem',
                                        marginTop: '-1px'
                                    }
                                }
                            }}
                        />
                    } 
                    label={
                        <Typography variant="h6" sx={{
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '1rem'
                            }
                        }}>
                            {subtask.title}
                        </Typography>
                    } 
                />
                <Typography 
                    variant="body1" 
                    sx={{
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '.9rem'
                        }
                    }} 
                    marginLeft="3.4rem"
                >
                    {subtask.description}
                </Typography>
            </Stack>
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
        <FormGroup sx={{ gap: '1rem' }}>
            {content}
        </FormGroup>
    )
}

export default Subtasks;