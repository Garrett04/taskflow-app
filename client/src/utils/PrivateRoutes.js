import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from "../features/auth/authSlice";
import { useEffect } from "react";
import { fetchAuthenticationStatus } from "../services/authService";

const PrivateRoutes = () => {
    const location = useLocation();
    const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthenticationStatus());
    }, [dispatch])

    if (isAuthenticatedStatus === 'fulfilled') {
        if (isAuthenticated) {
            return <Outlet/>;
        } else {
            return <Navigate to="/login" replace state={{ from: location }}/>;
        }
    }
}

export default PrivateRoutes;