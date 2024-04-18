import { useDispatch, useSelector } from "react-redux";
import { getSubtasksError, getSubtasksStatus, selectSubtasks } from "../features/subtasks/subtasksSlice";
import { useEffect } from "react";
import { fetchSubtasksByTaskId } from "../services/subtasksService";
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Subtasks from "../components/main/Subtasks";


const TaskDetails = () => {
    

    return (
     <>
        <Subtasks />
     </>   
    )
}

export default TaskDetails;