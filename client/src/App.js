import { 
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";

import Root from './pages/Root';
import Tasks from "./components/main/Tasks";
import PrivateRoutes from './utils/PrivateRoutes';
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus } from "./features/auth/authSlice";
import Register from "./pages/Register";
import TaskModal from "./pages/TaskModal";
import CompletedTasks from "./pages/CompletedTasks";
import OverdueTasks from "./pages/OverdueTasks";
import Trash from "./pages/Trash";



function App() {
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);

  // const router = createBrowserRouter(createRoutesFromElements(
  //   <>
  //     <Route path="/" element={<Root />}>
  //       <Route path="/" element={<Tasks />} />
  //       <Route path="/completed-tasks" element={<CompletedTasks />} />
  //       <Route path="/overdue-tasks" element={<OverdueTasks />} />
  //       <Route path="/trash" element={<Trash />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //     </Route>
  //     {background &&
  //     <>
  //       <Route path="/task/:id" element={<TaskModal />} />
  //       <Route path="/trash/task/:id" element={<TaskModal />} />
  //       <Route path="/completed-tasks/task/:id" element={<TaskModal />} />
  //       <Route path="/overdue-tasks/task/:id" element={<TaskModal />} />
  //     </>
  //     }
  //   </>
  // ));

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
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
      ]
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
