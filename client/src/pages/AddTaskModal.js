import { Button, Card, CardHeader, Collapse, FormGroup, Grid, Grow, IconButton, Input, Modal, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import AddSubtaskButton from "../components/main/AddSubtask";
import { createTask, fetchTasksByUserId } from "../services/tasksService";
import { useNavigate } from "react-router-dom";
import AddSubtask from "../components/main/AddSubtask";
import { ModalBox } from "../components/main/MainStyles";
import { useDispatch } from "react-redux";

const AddTask = () => {
    const [taskData, setTaskData] = useState({
        title: "",
    });

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                navigate(`/task/${newTask.id}`)
                dispatch(fetchTasksByUserId());
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
            navigate('/');
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
                        
                    </FormGroup>
                </Card>
            </ModalBox>
        </Modal>
    )
}

export default AddTask;