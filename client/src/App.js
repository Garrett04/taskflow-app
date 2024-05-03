import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Root from './pages/Root';
import Tasks from "./components/main/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus } from "./features/auth/authSlice";
import Login from './pages/Login';
import Register from './pages/Register';
import AccountInfo from "./pages/AccountInfo";
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoutes from './utils/PrivateRoutes';
import NotFound from "./pages/NotFound/NotFound";


function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: '/account-info',
              element: <AccountInfo />,
            },
            {
              path: '/',
              element: <Tasks />,
              children: [
                {
                  path: 'task/:id',
                  element: null,
                }
              ]
            },
            {
              path: '/completed-tasks',
              element: <Tasks />,
              children: [
                {
                  path: 'task/:id',
                  element: null,
                }
              ]
            },
            {
              path: '/overdue-tasks',
              element: <Tasks />,
              children: [
                {
                  path: 'task/:id',
                  element: null,
                }
              ]
            },
            {
              path: '/trash',
              element: <Tasks />,
              children: [
                {
                  path: 'task/:id',
                  element: null,
                }
              ]
            }
          ]
        },
      ],
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '*',
      element: <NotFound/>
    }
  ])

  const theme = createTheme({
    palette: {
      // mode: prefersDarkMode ? 'dark' : 'light',
      mode: 'dark',
      primary: {
        light: '#757ce8',
        main: '#03a9f4',
        dark: '#293132',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#ff7961',
        main: '#000000',
        dark: '#ba000d',
        contrastText: '#FFF',
      },
      indigo: {
        main: '#340068',
        light: '#7A00F5',
        dark: '#47008F',
        contrastText: '#FFF'
      },
      background: {
        default: '#121212',
        paper: '#212121',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
      },
    },
    typography: {
      taskTitle: {
        fontSize: '1.5rem',
        fontFamily: 'sans',
      },
    },
  })

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);
  

  if (isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') {
    return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    );
  }
}

export default App;
