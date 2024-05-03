import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Root from './pages/Root';
import Tasks from "./components/main/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from "./features/auth/authSlice";
import Login from './pages/Login';
import Register from './pages/Register';
import AccountInfo from "./pages/AccountInfo";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import PrivateRoutes from './utils/PrivateRoutes';
import NotFound from "./pages/NotFound/NotFound";


function App() {
  // To get the users preferred color scheme.
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Router tree
  const router = createBrowserRouter([
    {
      // This is where the app layout is provided
      path: '/',
      element: <Root />,
      children: [
        {
          // This handles user authentication
          element: <PrivateRoutes />,
          children: [
            // Where all the account info is provided and can be updated
            {
              path: '/account-info',
              element: <AccountInfo />,
            },
            {
              // Can be considered as the starting point for an authenticated user.
              // All tasks get rendered here
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
              // A completed tasks page which shows all the completed tasks.
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
              // An overdue tasks page where all overdue tasks exists
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
              // A trash page where all archived/tasks to be deleted exist.
              // A task remains for 30 days before it gets permanantaly deleted.
              // or the user can manually delete it.
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

  // MUI theme settings
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
      // This color is used for a task card and modal
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
  })

  // dispatch fetchAuthenticationStatus to check if user is authenticated before proceeding
  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);
  

  // Strict checks to see if user is authenticated properly.
  if ((isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') && typeof isAuthenticated === 'boolean') {
    return (
      // ThemeProvider is used by MUI for applying the theme settings
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* RouterProvider is used by react-router */}
        <RouterProvider router={router}/>
      </ThemeProvider>
    );
  }
}

export default App;
