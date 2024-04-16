import MuiLogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { fetchAuthenticationStatus, logoutUser } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const Button = styled(MuiButton)(({ theme }) => ({
    '&.MuiButton-contained': {
        width: '1rem', 
        border: '1px solid black',
        '&:hover': {
            background: 'red'
        }
    }
}))

const LogoutIcon = styled(MuiLogoutIcon)(({ theme }) => ({
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    }
}))



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
                <LogoutIcon />
            </Button>
        )
    }
}

export default LogoutButton;