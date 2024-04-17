import { Button, Card, CardHeader, FormGroup, Grid, Grow, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddSubtaskButton from "../components/main/AddSubtaskButton";
import { createTask } from "../services/tasksService";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
    const [taskData, setTaskData] = useState({
        title: "",
    });

    const navigate = useNavigate();

    const handleTaskData = (e) => {
        const { name, value } = e.target;
        
        setTaskData((prev) => ({
            ...prev,
            [name]: value 
        }));
    }

    const createNewTask = async (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            try {
                const newTask = await createTask(taskData);
                console.log(newTask);
                
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Card variant="outlined">
            <FormGroup>
                <Input 
                    placeholder="Task Title"  
                    name="title" 
                    value={taskData.title} 
                    onChange={handleTaskData}
                    onKeyUp={createNewTask}
                />
            </FormGroup>
        </Card>
    )
}

export default AddTask;