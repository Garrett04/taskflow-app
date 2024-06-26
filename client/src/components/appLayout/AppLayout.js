import * as React from 'react';
import Box from '@mui/material/Box';
import ResponsiveDrawer from './ResponsiveDrawer';
import { Toolbar } from '@mui/material';
import { useTheme } from '@emotion/react';

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  const theme = useTheme();

  return (
      <Box sx={{ display: 'flex' }}>
        {/* Responsive Drawer has the header with it */}
        <ResponsiveDrawer/>
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            }
          }}
        >
          <Toolbar />
          {/* this is where all the main content gets rendered */}
          {children}
        </Box>
      </Box>
  );
}

export default AppLayout;