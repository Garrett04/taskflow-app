/*
 moved to TaskModal
*/

// import { Button, Card, CardHeader, Collapse, FormGroup, Grid, Grow, IconButton, Input, Modal, TextField, styled } from "@mui/material";
// import { useEffect, useState } from "react";
// import AddSubtaskButton from "../components/main/AddSubtask";
// import { createTask, fetchTasksByUserId, updateTask } from "../services/tasksService";
// import { useNavigate, useParams } from "react-router-dom";
// import AddSubtask from "../components/main/AddSubtask";
// import { ModalBox, TaskTitle } from "../components/main/MainStyles";
// import { useDispatch } from "react-redux";

// const AddTaskModal = () => {
//     const [title, setTitle] = useState("");
//     const [open, setOpen] = useState(true);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { id } = useParams();

//     const handleChange = (e) => {
//         const { value } = e.target;
        
//         setTitle(value);
//     }

    

//     const handleClose = (e) => {
//         if (e.target === e.currentTarget) {
//             setOpen(false);
//             navigate('/');
//             dispatch(fetchTasksByUserId());
//         }
//     }

//     // return (
        
//     // )
// }

// export default AddTaskModal;