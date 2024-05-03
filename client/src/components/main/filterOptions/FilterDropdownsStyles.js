import { styled } from "@mui/material";
import { Box as MuiBox } from '@mui/material';

export const Box = styled(MuiBox)(({ theme }) => ({
    display: 'flex',
    width: '30%',
    margin: '1rem auto',
    gap: '1rem',
    [theme.breakpoints.down('sm')]: {
        width: '70%',
    }
}))