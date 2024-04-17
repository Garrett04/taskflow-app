import AddTask from "@mui/icons-material/AddTask";
import { Grid, IconButton, styled } from "@mui/material";
import MuiAddTaskIcon from '@mui/icons-material/AddTask';


export const Main = styled(Grid)(({ theme }) => ({
    padding: '1rem 5rem 0',
    margin: '5rem 0',
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