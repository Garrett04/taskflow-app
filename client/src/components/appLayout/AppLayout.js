import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveDrawer from './ResponsiveDrawer';
import { Toolbar } from '@mui/material';
import { useTheme } from '@emotion/react';

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  const theme = useTheme();

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
          {children}
        </Box>
      </Box>
  );
}

export default AppLayout;