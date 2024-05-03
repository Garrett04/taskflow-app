import { FormGroup, styled } from "@mui/material";
import MuiTextField from '@mui/material/TextField';

export const Form = styled(FormGroup)(({ theme }) => ({
    width: '70%',
    border: '1px solid black',
    borderRadius: '2rem',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '3rem',
    backgroundColor: theme.palette.primary.light,
}))

export const TextField = styled(MuiTextField)(() => ({
    width: '50%',
    margin: '1rem auto'
}))