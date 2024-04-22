import { useTheme } from "@emotion/react";
import { Box, Button, Collapse, FormControl, FormGroup, Input, TextField } from "@mui/material";
import { useState } from "react";
import { createSubtask, fetchSubtasksByTaskId } from "../../services/subtasksService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTasksByUserId } from "../../services/tasksService";


const AddSubtask = ({
    task_id,
    page,
    task_status,
    archived
}) => {
    const theme = useTheme();
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { task_id, title, description };

            const newSubtask = await createSubtask(data);

            dispatch(fetchSubtasksByTaskId(task_id));
            
        } catch (err) {
            console.log(err);
        }
    }
 
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    }

    return (
        <Box 
            height="12rem" 
            sx={{
                background: theme.palette.ochre.light,
            }}
            hidden={archived || task_status === 'overdue'}
        >       
            <form onSubmit={handleSubmit}>
                <TextField 
                    placeholder="Subtask Title" 
                    fullWidth
                    value={title}
                    name="title"
                    onChange={handleChange}
                    required
                />
                <TextField  
                    placeholder="Subtask description"
                    fullWidth
                    value={description}
                    name="description"
                    onChange={handleChange}
                />
                <Button type="submit">Add Subtask</Button>
            </form>
        </Box>
    )
}

export default AddSubtask;