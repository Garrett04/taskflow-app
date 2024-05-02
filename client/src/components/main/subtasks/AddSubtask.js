import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Select, TextField } from "@mui/material";
import { useState } from "react";
import { createSubtask, fetchSubtasksByTaskId, fetchSubtasksByUserId } from "../../../services/subtasksService";
import { useDispatch } from "react-redux";
import ExistingSubtasksDropdown from "./ExistingSubtasksDropdown";


const AddSubtask = ({
    task_id,
    task_status,
    archived
}) => {
    const theme = useTheme();
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    
    const [existingSubtaskTitle, setExisitingSubtaskTitle] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (archived || task_status === 'overdue') {
                return;
            }
            const data = { task_id, title, description };

            await createSubtask(data);

            dispatch(fetchSubtasksByTaskId(task_id));
            dispatch(fetchSubtasksByUserId(task_id));

            setTitle("");
            setDescription("");
            setExisitingSubtaskTitle("");
            
        } catch (err) {
            console.log(err);
        }
    }
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        if (name === 'existing-subtask') {
            setTitle(value.subtask_title);
            setDescription(value.subtask_description);
            setExisitingSubtaskTitle(value.subtask_title);
        }

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
                margin: '0 0 2.5rem',
            }}
            hidden={archived || task_status === 'overdue'}
        >       
        <Divider sx={{ bgcolor: 'black' }} />
            <form
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    margin: '1rem 2rem',
                    gap: '1rem',
                }} 
                onSubmit={handleSubmit}
            >
                <TextField 
                    placeholder="Subtask Title" 
                    fullWidth
                    value={title}
                    name="title"
                    onChange={handleChange}
                    required
                    sx={{ 
                        '&.MuiInputBase-root': {
                            color: 'black'
                        } 
                    }}
                />
                <TextField  
                    placeholder="Subtask description"
                    fullWidth
                    value={description}
                    name="description"
                    onChange={handleChange}
                />
                <Box
                    sx={{
                        display: 'flex',                       
                        justifyItems: 'center',
                        alignContent: 'center',
                        width: '100%',
                        margin: 'auto',
                        gap: '1rem'
                    }}
                >
                    <ExistingSubtasksDropdown 
                        task_id={task_id}
                        title={title} 
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        handleChange={handleChange}
                        existingSubtaskTitle={existingSubtaskTitle}
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        sx={{ border: '1px solid black' }}
                    >
                        Add Subtask
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddSubtask;