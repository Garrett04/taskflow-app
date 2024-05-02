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
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
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
      ],
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    }
  ])

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        light: '#757ce8',
        main: '#03a9f4',
        dark: '#002884',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#ff7961',
        main: '#000000',
        dark: '#ba000d',
        contrastText: '#FFF',
      },
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#FFF',
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
