import { useTheme } from "@emotion/react";
import { Box, Button, Collapse, Input, TextField } from "@mui/material";
import { useState } from "react";



const AddSubtask = () => {
    const theme = useTheme();

    const handleClick = () => {
        
    }

    return (
        <Box 
            height="12rem" 
            sx={{
                background: theme.palette.ochre.light,
            }}
        >    
            <Input 
                placeholder="Subtask Title" 
                fullWidth
            />
            <TextField  
                placeholder="Subtask description"
                fullWidth
            />
            <Button>Add Subtask</Button>
        </Box>
    )
}

export default AddSubtask;