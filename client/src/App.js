import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Root from './pages/Root';
import Main from "./components/main/Main";
import PrivateRoutes from './utils/PrivateRoutes';
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus } from "./features/auth/authSlice";
import Register from "./pages/Register";
import AddTask from "./pages/AddTaskModal";
import TaskModal from "./pages/TaskModal";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={ <Root/> }>
      <Route path="/" element={ <Main/> }>
        <Route element={ <PrivateRoutes/> }>

        </Route>
        <Route path="/tasks/:id" element={ <TaskModal/> } />
        <Route path='/add-task' element={ <AddTask/> }/>
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
