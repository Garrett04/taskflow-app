import { Box, Card, CardContent, IconButton, TextField, Typography, styled } from "@mui/material";
import MuiAddTaskIcon from '@mui/icons-material/AddTask';

export const Button = styled(IconButton)(({ theme }) => ({
    '&.MuiIconButton-root': {
        background: theme.palette.indigo.main,
        color: theme.palette.indigo.contrastText 
    },
    position: "fixed", 
    bottom: '0', 
    right: '0', 
    margin: '2rem',
}))


export const AddTaskIcon = styled(MuiAddTaskIcon)(({ theme }) => ({
    fontSize: '1.8rem'
}))

export const TaskHeader = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.indigo.main,
    padding: '.5rem 1.1rem',
    overflowWrap: 'break-word',
    textAlign: 'left',
    display: "flex", 
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

export const TaskHeaderButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    width: '8%',
    [theme.breakpoints.up('xl')]: {
       width: '5%', 
    }
}))

export const CardBottom = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 auto',
    alignItems: 'center',
    background: theme.palette.mode === 'dark' ? theme.palette.indigo.main : theme.palette.indigo.light
}));

export const MuiDeadlineDate = styled(Typography)(({ theme, is_completed }) => ({
    color: is_completed === 'true' ? '#32de84' : 'red',
    fontSize: '1.2rem'
}))

export const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
}))

export const TaskTitle = styled(TextField)(({ theme }) => ({
    fontFamily: 'sans',
    backgroundColor: theme.palette.indigo.dark,
    padding: '.5rem',
    '& .MuiInputBase-input': {
        color: 'white',
        fontSize: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem'
        }
    }
}))

export const TaskCard = styled(Card)(({ theme, task_archived }) => ({
    textAlign: 'center',
    background: theme.palette.mode === 'dark' ? theme.palette.indigo.dark : theme.palette.indigo.light,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    // Indicating a task which is going to be deleted
    outline: task_archived === 'true' ? '2px dotted red' : null,
    opacity: task_archived === 'true' ? 0.7 : null,
    color: 'white'
}))