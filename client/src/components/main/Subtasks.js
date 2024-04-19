import { useDispatch, useSelector } from "react-redux";
import { fetchSampleSubtasks, getSubtasksError, getSubtasksStatus, selectSampleSubtasks, selectSubtasks } from "../../features/subtasks/subtasksSlice";
import { useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchSubtasksByTaskId } from "../../services/subtasksService";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { handleTaskExpand } from "../../utils/handleTaskExpand";
import AddSubtask from "./AddSubtask";
import DeleteSubtaskButton from "./DeleteSubtaskButton";


const Subtasks = ({ 
    task_id,
    inTaskModal // Will always come only from TaskModal page 
}) => {
    const theme = useTheme();
    const subtasks = useSelector(selectSubtasks);

    const subtasksStatus = useSelector(getSubtasksStatus);
    const subtasksError = useSelector(getSubtasksError);
    
    const sampleSubtasks = useSelector(selectSampleSubtasks);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);


    useEffect(() => {
        dispatch(fetchSubtasksByTaskId(task_id));
    }, [dispatch, task_id])
    

    const renderSubtasks = () => {
        // console.log(subtasks[task_id]);
        const subtasksToRender = isAuthenticated ? subtasks[task_id] : sampleSubtasks[task_id];
        // const foundSubtasks = subtasksToRender.filter(subtask => subtask.task_id === task_id);
        // console.log(subtasks);

        if (subtasksToRender) {
            return subtasksToRender.map(subtask => (
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
                        onClick={handleTaskExpand}
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
                    <DeleteSubtaskButton task_id={subtask.task_id} id={subtask.id} />
                </Stack>
            ))
        }
        return null;
    }

    let content;
    if (subtasksStatus === 'pending') {
        content = 'Loading...';
    } else if (subtasksStatus === 'fulfilled' || sampleSubtasks) {
        content = renderSubtasks();
    } else if (subtasksStatus === 'rejected') {
        content = subtasksError;
    }

    return (
        <FormGroup sx={{ gap: '1rem' }}>
            {content}
            {inTaskModal && <AddSubtask />}
        </FormGroup>
    )
}

export default Subtasks;