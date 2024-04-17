import { Box, Container, Grid, Typography, styled } from "@mui/material";
import MuiButton from '@mui/material/Button';

export const Logo = styled(Typography)(({ theme }) => ({
    '&.MuiTypography-root': {
      fontSize: '3rem',
      fontFamily: 'Special Elite',
      marginTop: '.5rem',
      
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.2rem'
      }
    },
}));

export const Button = styled(MuiButton)(({ theme, backgroundColor }) => ({
    '&.MuiButton-contained': {
        width: '1rem', 
        border: '1px solid black',
        '&:hover': {
            background: backgroundColor
        },
        [theme.breakpoints.down('sm')]: {
            height: '3rem',
        }
    },
    '&.MuiButtonBase-root': {
        [theme.breakpoints.down('sm')]: {
            minWidth: '3rem',
            margin: 'auto'
        }
    }
}));

export const ButtonIcon = styled(({ icon: Icon, ...rest }) => (
    <Icon {...rest} />
))(({ theme }) => ({
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    }
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '2.2rem',
    padding: '.5rem 0',
    [theme.breakpoints.down('sm')]: {
        gap: '.5rem',
    }
}))