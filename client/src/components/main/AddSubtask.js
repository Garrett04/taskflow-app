import { Box, Button, Collapse, Input, TextField } from "@mui/material";
import { useState } from "react";



const AddSubtask = () => {
    const [expand, setExpand] = useState(true);

    const handleClick = () => {
        
    }

    return (
        <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box 
                height="15rem" 
                sx={{
                    padding: '1rem'
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
        </Collapse>
    )
}

export default AddSubtask;