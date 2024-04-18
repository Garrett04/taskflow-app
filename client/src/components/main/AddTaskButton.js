import { Tooltip } from "@mui/material"
import { AddTaskIcon, Button } from "./MainStyles"
import { useNavigate } from "react-router-dom"


const AddTaskButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-task');
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