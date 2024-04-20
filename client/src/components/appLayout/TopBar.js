import { Box, Grid, IconButton, Toolbar, styled } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountButton from "./AccountButton";
import LogoutButton from "./LogoutButton";
import { ButtonContainer, Logo } from "./AppLayoutStyles";
import { useTheme } from "@emotion/react";

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



const TopBar = ({ 
  open, 
  handleDrawerOpen,
  isAuthenticated
}) => {
    const theme = useTheme();

    return (
      <AppBar position="fixed" open={open} elevation={0} sx={{ borderBottom: '2px solid black' }}>
        <Toolbar>
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
          <Grid 
            container 
            flexDirection='row'
            flexWrap='nowrap' 
            justifyContent='space-between' 
            alignItems='center'
          >
            <a href="/" className="logo">
              <Logo>TaskFlow</Logo>
            </a>
            <ButtonContainer>
                <AccountButton />
                <LogoutButton />
            </ButtonContainer>
          </Grid>
        </Toolbar>
      </AppBar>
    )
}

export default TopBar;