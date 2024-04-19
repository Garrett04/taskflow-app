import { Tooltip } from "@mui/material"
import { AddTaskIcon, Button } from "./MainStyles"
import { useNavigate } from "react-router-dom"
import { createTask, fetchTasksByUserId } from "../../services/tasksService";
import { useDispatch } from 'react-redux'


const AddTaskButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            const newTask = await createTask();
            navigate(`/task/${newTask.id}`);
            dispatch(fetchTasksByUserId());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Tooltip title='Add new task' placement="top">
            <Button onClick={handleClick} size="large">
                <AddTaskIcon />
            </Button> 
        </Tooltip>
    )
}

export default AddTaskButton;