import { Box, Button, Input, TextField } from "@mui/material";



const AddSubtask = () => {
    const handleClick = () => {
        
    }

    return (
        <Box height="15rem" sx={{
            padding: '1rem'
        }}>
            <Input 
                placeholder="Subtask Title" 
                fullWidth
            />
            <TextField  
                placeholder="Subtask description"
                fullWidth
            />
        </Box>
    )
}

export default AddSubtask;