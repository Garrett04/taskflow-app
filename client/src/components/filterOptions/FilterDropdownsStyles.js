import { styled } from "@mui/material";
import { Box as MuiBox } from '@mui/material';

export const Box = styled(MuiBox)(({ theme }) => ({
    display: 'flex',
    width: '30%',
    margin: '6rem auto 0',
    gap: '1rem'
}))