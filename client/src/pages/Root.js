import { Outlet } from "react-router-dom"
import AppLayout from "../components/appLayout/AppLayout";
import { useSelector } from "react-redux";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from "../features/auth/authSlice";

const Root = () => {
    const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if ((isAuthenticatedStatus === 'fulfilled' || isAuthenticatedStatus === 'rejected') && typeof isAuthenticated === 'boolean') {
      return (
        <AppLayout>
          <Outlet/>
        </AppLayout>
      )
    }
}

export default Root;