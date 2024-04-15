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

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={ <Root/> }>
        <Route index element={ <Main/> }/>
        <Route element={ <PrivateRoutes/> }>
          {/* <Route path="/tasks/:id"/> */}
        </Route>
      </Route>
      <Route path="/login" element={ <Login/> }/> 
    </>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;
