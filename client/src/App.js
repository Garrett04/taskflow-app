import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
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
import Main from "./components/main/Main";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={ <Root/> }>
      <Route path="/" element={ <Main/> }>
        {/* <Route element={ <PrivateRoutes/> }>

        </Route> */}
        <Route path="/" element={ <Tasks/> }>
          <Route path="task/:id" element={ <TaskModal/> }/>
        </Route>
        <Route path="/completed-tasks" element={ <CompletedTasks/> }>
          <Route path="task/:id" element={ <TaskModal/> }/>
        </Route>
        <Route path="/overdue-tasks" element={ <OverdueTasks/> }>
          <Route path="task/:id" element={ <TaskModal page={"Overdue Tasks"} /> }/>
        </Route>
        <Route path="trash" element={ <Trash /> }>
          <Route path="task/:id" element={ <TaskModal page={"Trash"} /> }/>
        </Route>
      </Route>
    </Route>
    <Route path="/login" element={ <Login/> }/> 
    <Route path="/register" element={ <Register/> }/>
  </>
))

function App() {
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus); 

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);

  if (isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') {
    return (
      <RouterProvider router={router} />
    );
  }
}

export default App;
