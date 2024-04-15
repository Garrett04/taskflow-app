import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Root from './pages/Root';
import Main from "./pages/Main";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Main/> }/>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;
