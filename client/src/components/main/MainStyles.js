import AddTask from "@mui/icons-material/AddTask";
import { Box, Card, CardContent, Grid, IconButton, Input, Typography, styled } from "@mui/material";
import MuiAddTaskIcon from '@mui/icons-material/AddTask';
import MuiCardHeader from '@mui/material/CardHeader';


export const MainGrid = styled(Grid)(({ theme }) => ({
    padding: '0 5rem',
    margin: '.5rem auto',
    [theme.breakpoints.down('sm')]: {
        margin: '3.5rem 2rem 0',
        padding: '1rem 2.5rem 0'
    }
}))

export const Button = styled(IconButton)(({ theme }) => ({
    '&.MuiIconButton-root': {
        background: theme.palette.ochre.main,
        color: theme.palette.ochre.contrastText 
    },
    position: "fixed", 
    bottom: '0', 
    right: '0', 
    margin: '2rem',
}))


export const AddTaskIcon = styled(MuiAddTaskIcon)(({ theme }) => ({
    fontSize: '1.8rem'
}))

export const CardHeader = styled(MuiCardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.ochre.main,
    padding: '.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    }
}));

export const CardBottom = styled(CardContent)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

export const MuiDeadlineDate = styled(Typography)(() => ({
    color: 'red',
    fontSize: '1.2rem'
}))

export const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}))

export const TaskTitle = styled(Input)(({ theme }) => ({
    fontSize: '1.5rem',
    fontFamily: 'sans',
    backgroundColor: theme.palette.ochre.main,
}))

export const TaskCard = styled(Card)(({ theme, task_archived }) => ({
    textAlign: 'center',
    background: theme.palette.ochre.light,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    // Indicating a task which is going to be deleted
    border: task_archived === 'true' ? '2px dotted red' : null,
    opacity: task_archived === 'true' ? 0.7 : null,
}))