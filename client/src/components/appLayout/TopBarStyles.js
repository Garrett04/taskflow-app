import { styled } from "@mui/material";
import MuiButton from '@mui/material/Button';

export const Button = styled(MuiButton)(({ theme, backgroundColor }) => ({
    '&.MuiButton-contained': {
        width: '1rem', 
        border: '1px solid black',
        '&:hover': {
            background: backgroundColor
        }
    }
}));

export const ButtonIcon = styled(({ icon: Icon, ...rest }) => (
    <Icon {...rest} />
))(({ theme }) => ({
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    }
}));