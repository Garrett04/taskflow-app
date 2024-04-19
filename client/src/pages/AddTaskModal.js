import { Button, Card, CardHeader, Collapse, FormGroup, Grid, Grow, IconButton, Input, Modal, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import AddSubtaskButton from "../components/main/AddSubtask";
import { createTask, fetchTasksByUserId, updateTask } from "../services/tasksService";
import { useNavigate, useParams } from "react-router-dom";
import AddSubtask from "../components/main/AddSubtask";
import { ModalBox, TaskTitle } from "../components/main/MainStyles";
import { useDispatch } from "react-redux";

const AddTaskModal = () => {
    const [title, setTitle] = useState("");
    const [expand, setExpand] = useState(false);

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const handleChange = (e) => {
        const { value } = e.target;
        
        setTitle(value);
    }

    const updateTaskTitle = async (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            try {
                const updatedTask = await updateTask({ id: id, title });
                console.log(updatedTask);

                setExpand(true);
                
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
            navigate('/');
            dispatch(fetchTasksByUserId());
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <ModalBox>
                <Card 
                    variant="outlined" 
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <FormGroup>
                        <TaskTitle 
                            placeholder="Task Title"  
                            name="title" 
                            value={title} 
                            onChange={handleChange}
                            onKeyUp={updateTaskTitle}
                        />
                    </FormGroup>
                    <Collapse 
                        in={expand} 
                        timeout="auto" 
                        unmountOnExit
                    >
                        <AddSubtask />
                    </Collapse>
                </Card>
            </ModalBox>
        </Modal>
    )
}

export default AddTaskModal;