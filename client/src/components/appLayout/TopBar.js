import { Box, Grid, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountButton from "./AccountButton";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Logo = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-root': {
    fontSize: '3rem',
    fontFamily: 'Special Elite',
    marginTop: '.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem'
    }
  },
}));

const TopBar = ({ 
  open, 
  handleDrawerOpen,
  isAuthenticated
}) => {
    return (
      <AppBar position="fixed" open={open} elevation={0} sx={{ borderBottom: '2px solid black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isAuthenticated && <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ fontSize: '2rem' }} />
          </IconButton>}
          <Logo>TaskFlow</Logo>
          <Box display='flex' gap='1.5rem'>
            <AccountButton />
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
    )
}

export default TopBar;