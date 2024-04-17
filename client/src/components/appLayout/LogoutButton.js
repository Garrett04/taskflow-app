import { Button, ButtonIcon } from './TopBarStyles';
import { fetchAuthenticationStatus, logoutUser } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        await dispatch(fetchAuthenticationStatus());
        navigate('/');
    }

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
            >
                <ButtonIcon icon={LogoutIcon} />
            </Button>
        )
    }
}

export default LogoutButton;