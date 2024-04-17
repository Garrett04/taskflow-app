import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Root from './pages/Root';
import Main from "./components/main/Tasks";
import PrivateRoutes from './utils/PrivateRoutes';
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "./services/authService";
import { getIsAuthenticatedStatus } from "./features/auth/authSlice";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Main/> }/>
      <Route element={ <PrivateRoutes/> }>
        {/* <Route path="/tasks/:id"/> */}
      </Route>
      <Route path='/add-task' element={ <AddTask/> }/>
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
