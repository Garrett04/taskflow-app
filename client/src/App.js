import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
  Routes,
  useLocation,
  useRoutes
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



function App() {
  const dispatch = useDispatch();
  const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
  const location = useLocation();
  const background = location.state?.background;

  // const router = createBrowserRouter(createRoutesFromElements(
  //   <>
  //       <Route path="/" element={ <Root/> }>
  //         {/* <Route element={ <PrivateRoutes/> }>
  
  //         </Route> */}
          
  //           <Route path="/" element={ <Tasks/> }>
  //             <Route path="task/:id" element={ <TaskModal/> }/>
  //           </Route>
  //           <Route path="/completed-tasks" element={ <CompletedTasks/> }>
  //             <Route path="task/:id" element={ <TaskModal/> }/>
  //           </Route>
  //           <Route path="/overdue-tasks" element={ <OverdueTasks/> }>
  //             <Route path="task/:id" element={ <TaskModal/> }/>
  //           </Route>
  //           <Route path="/trash" element={ <Trash /> }>
  //           <Route path="task/:id" element={ <TaskModal/> }/>
  //           </Route>
          
  //       </Route>
  //       <Route path="/login" element={ <Login/> }/> 
  //       <Route path="/register" element={ <Register/> }/>
  //   </>
  // ))


  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);

  if (isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') {
    return (
      <>
        <Routes location={background || location}>
          <Route path="/" element={ <Root/> }>
            {/* <Route element={ <PrivateRoutes/> }>
            </Route> */}
              <Route path="/" element={ <Tasks/> }/>
              <Route path="/completed-tasks" element={ <CompletedTasks/> }/>
              <Route path="/overdue-tasks" element={ <OverdueTasks/> }/>
              <Route path="/trash" element={ <Trash /> }/>
          </Route>
          <Route path="/login" element={ <Login/> }/> 
          <Route path="/register" element={ <Register/> }/>
        </Routes>

        {background && (
        <Routes>
          <Route path="/task/:id" element={ <TaskModal /> } />
          <Route path="/trash/task/:id" element={ <TaskModal /> } />
          <Route path="/completed-tasks/task/:id" element={ <TaskModal /> } />
          <Route path="/overdue-tasks/task/:id" element={ <TaskModal /> } />
        </Routes>
        )}
      </>
    );
  }
}

export default App;
