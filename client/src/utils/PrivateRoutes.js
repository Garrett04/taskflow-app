import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSlice";

const PrivateRoutes = () => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <Outlet/>;
    } else {
        return <Navigate to="/login" replace state={{ from: location }}/>;
    }
    
}

export default PrivateRoutes;