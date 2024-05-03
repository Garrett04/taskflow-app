import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { Grid, Icon, SvgIcon } from '@mui/material';
import { ButtonContainer, Logo } from './AppLayoutStyles';
import AccountButton from './AccountButton';
import LogoutButton from './LogoutButton';
import SearchBar from './SearchBar';
import { ReactComponent as TaskFlowLogo } from '../../resources/images/logo.svg';
import { useTheme } from "@emotion/react";
import { FaTasks } from 'react-icons/fa';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
    const theme = useTheme();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    // when a button in the drawer is clicked, 
    // it will navigate the user accordingly.
    const handleClick = (text) => {
      if (text === 'All Tasks') {
        navigate('/');
      } else if (text === 'Completed Tasks') {
        navigate('/completed-tasks');
      } else if (text === 'Overdue Tasks') {
        navigate('/overdue-tasks');
      } else if (text === 'Trash') {
        navigate('/trash');
      }
    }

    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };

    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };

    const drawer = (
      <div>
        {/* Logo over here will only be rendered in mobile and tablet view */}
        <Logo 
          sx={{
            fontSize: '2rem',
            margin: '1rem 3rem 0',
            [theme.breakpoints.up('sm')]: {
              display: 'none'
            }
          }}
        >
          TaskFlow
        </Logo>
        <Toolbar 
          sx={{
            [theme.breakpoints.down('sm')]: {
              display: 'none'
            }
          }}
        />
        {/* To connect the bottom border between header and the drawer, 
        the styles have been adjusted a little */}
        <Divider 
            sx={{ 
                marginTop: '1rem', 
                [theme.breakpoints.down('sm')]: {
                  marginTop: '.42rem'
                },
                [theme.breakpoints.down('md')]: {
                  marginTop: '.44rem'
                }
            }} 
        />
        <List>
          {['All Tasks', 'Completed Tasks', 'Overdue Tasks', 'Trash'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                    minHeight: 48,
                    px: 2.5,
                }}
                onClick={() => handleClick(text)}
              >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                    }}
                >
                    {index === 0 && <Icon sx={{ fontSize: '1.4rem', mr: '.1rem' }}><FaTasks/></Icon>}
                    {index === 1 && <TaskIcon />}
                    {index === 2 && <HourglassDisabledIcon />}
                    {index === 3 && <DeleteIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            borderBottom: '1px solid white'
          }}
          elevation={0}
        >
          <Toolbar>
            {isAuthenticated 
            && <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{
                        marginRight: 3,
                        display: { sm: 'none' },
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
                <Logo
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      display: 'none'
                    }
                  }}
                >
                  TaskFlow
                </Logo>
                <SvgIcon
                  component={TaskFlowLogo} 
                  inheritViewBox 
                  sx={{
                    fontSize: '4rem',
                    marginLeft: '-1.5rem',
                    [theme.breakpoints.up('md')]: {
                      display: 'none',
                    }
                  }}
                />
              </a>
              {!pathname.includes('/account-info') && <SearchBar />}
              <ButtonContainer>
                  <AccountButton />
                  <LogoutButton />
              </ButtonContainer>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="navigation buttons"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    );
}
