import { Grid, styled } from "@mui/material";


export const Main = styled(Grid)(({ theme }) => ({
    padding: '1rem 4rem',

    [theme.breakpoints.down('sm')]: {
        marginLeft: '2rem',
        padding: '1rem 2.5rem'
    }
}))