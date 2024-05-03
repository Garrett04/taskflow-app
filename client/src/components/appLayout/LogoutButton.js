import { Button, ButtonIcon } from './AppLayoutStyles';
import { fetchAuthenticationStatus, logoutUser } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // make a call to the server to logout using the logoutUser service
    // and dispatch fetchAuthenticationStatus to update the authenticated state
    // navigate the user back to login screen.
    const handleLogout = async () => {
        await logoutUser();
        dispatch(fetchAuthenticationStatus());
        navigate('/login');
    }

    // Only if user is Authenticated, it will render the logout button
    if (isAuthenticated) {
        return (
            <Button 
                color="secondary"
                title='Logout' 
                aria-label='logout-button' 
                variant='contained'
                size='small'
                disableElevation
                onClick={handleLogout}
                // backgroundhovercolor is a custom prop passed in the button styles
                // this is to follow the DRY rule.
                backgroundhovercolor='red'
            >
                <ButtonIcon icon={LogoutIcon} />
            </Button>
        )
    }
}

export default LogoutButton;