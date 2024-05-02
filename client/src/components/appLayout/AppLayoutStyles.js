import { Box, Paper, Typography, styled } from "@mui/material";
import MuiButton from '@mui/material/Button';
import MuiInputBase from '@mui/material/InputBase';
import MuiIconButton from '@mui/material/IconButton';

export const Logo = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontFamily: 'Special Elite',
    marginTop: '.5rem',
}));

export const Button = styled(MuiButton)(({ theme, backgroundhovercolor }) => ({
    '&.MuiButton-contained': {
        width: '1rem', 
        border: '1px solid black',
        '&:hover': {
            background: backgroundhovercolor
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
        fontSize: '1.4rem',
    }
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '1.25rem',
    
    [theme.breakpoints.down('sm')]: {
        gap: '.5rem',
    }
}))


export const SearchBarContainer = styled(Paper)(({ theme }) => ({
    width: '50%',
    padding: '.3rem .8rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'width .1s',
    margin: '0 1rem',
    '&:focus-within': {
        width: '60%',
        transition: 'width .1s'
    },
    background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
        padding: '.2rem .6rem',
        '&:focus-within': {
            width: '50%',
        },
    }
}))

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem'
    }
}))

export const SearchButton = styled(MuiIconButton)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '1rem'
    }
}))