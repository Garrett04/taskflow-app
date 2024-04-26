import {
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";

import Root from './pages/Root';
import Tasks from "./components/main/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus } from "./features/auth/authSlice";
import CompletedTasks from "./pages/CompletedTasks";
import OverdueTasks from "./pages/OverdueTasks";
import Trash from "./pages/Trash";
import Login from './pages/Login';
import Register from './pages/Register';
import AccountInfo from "./pages/AccountInfo";


function App() {
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
          element: <CompletedTasks />,
          children: [
            {
              path: 'task/:id',
              element: null,
            }
          ]
        },
        {
          path: '/overdue-tasks',
          element: <OverdueTasks />,
          children: [
            {
              path: 'task/:id',
              element: null,
            }
          ]
        },
        {
          path: '/trash',
          element: <Trash />,
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

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);
  

  if (isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') {
    return <RouterProvider router={router}/>;
  }
}

export default App;
