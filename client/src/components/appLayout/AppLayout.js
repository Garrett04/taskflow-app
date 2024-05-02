import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveDrawer from './ResponsiveDrawer';
import { Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ResponsiveDrawer/>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
  );
}

export default AppLayout;