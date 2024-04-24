import { Tooltip } from "@mui/material"
import { AddTaskIcon, Button } from "./MainStyles"
import { useLocation, useNavigate } from "react-router-dom"
import { createTask, fetchTasksByUserId } from "../../services/tasksService";


const AddTaskButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async () => {
        try {
            const newTask = await createTask();
            
            navigate(`/task/${newTask.id}`, { state: { from: location.pathname, background: location } });
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