import { useDispatch, useSelector } from "react-redux";
import { fetchSampleSubtasks, getSubtasksError, getSubtasksStatus, selectSampleSubtasks, selectSubtasks } from "../../../features/subtasks/subtasksSlice";
import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchSubtasksByTaskId, updateSubtask } from "../../../services/subtasksService";
import { selectIsAuthenticated } from "../../../features/auth/authSlice";
import { handleTaskExpand } from "../../../utils/handleTaskExpand";
import AddSubtask from "./AddSubtask";
import DeleteSubtaskButton from "./DeleteSubtaskButton";
import { useLocation } from "react-router-dom";
import EditSubtaskButton from "./EditSubtaskButton";
import Subtask from "./Subtask";


const Subtasks = ({ 
    task_id,
    inTaskModal, // Will always come only from TaskModal page
    page,
    task_status,
    archived
}) => {
    const subtasks = useSelector(selectSubtasks);

    const subtasksStatus = useSelector(getSubtasksStatus);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchSubtasksByTaskId(task_id));
    }, [dispatch, task_id])

    let content;
    if (subtasksStatus === 'pending') {
        content = 'Loading...';
    } else if (subtasksStatus === 'fulfilled' || subtasks) {
        content = <Subtask 
                    task_id={task_id} 
                    subtasks={subtasks} 
                    archived={archived} 
                    task_status={task_status} 
                    inTaskModal={inTaskModal}
                />;
    }

    return (
        <FormGroup sx={{ gap: '1rem' }}>
            {content}
            {inTaskModal && <AddSubtask task_id={task_id} task_status={task_status} archived={archived} />}
        </FormGroup>
    )
}

export default Subtasks;