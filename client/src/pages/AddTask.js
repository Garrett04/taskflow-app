import { Button, Card, CardHeader, Collapse, FormGroup, Grid, Grow, IconButton, Input, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import AddSubtaskButton from "../components/main/AddSubtask";
import { createTask } from "../services/tasksService";
import { useNavigate } from "react-router-dom";
import AddSubtask from "../components/main/AddSubtask";

const AddTask = () => {
    const [taskData, setTaskData] = useState({
        title: "",
    });


    const [expand, setExpand] = useState(false);

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
                setExpand(true);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Card variant="outlined" sx={{
            textAlign: 'center'
        }}>
            <FormGroup>
                <Input 
                    placeholder="Task Title"  
                    name="title" 
                    value={taskData.title} 
                    onChange={handleTaskData}
                    onKeyUp={createNewTask}
                    sx={{
                        padding: '0 .8rem',
                        margin: '1rem 0',
                        fontSize: '2rem'
                    }}
                />
                <Collapse in={expand} timeout="auto" unmountOnExit>
                    <AddSubtask />
                </Collapse>
            </FormGroup>
        </Card>
    )
}

export default AddTask;