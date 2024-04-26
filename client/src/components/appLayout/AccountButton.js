import MuiAccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonIcon } from './AppLayoutStyles';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const AccountButton = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated); 

    const handleClick = () => {
        if (isAuthenticated) {
            navigate('/account-info');
        } else {
            navigate('/login');
        }
    }

    return (
        <Button 
            title={isAuthenticated ? 'Your account' : 'Login' }
            aria-label='account-button' 
            color='secondary'
            variant='contained'
            onClick={handleClick}
            size='small'
            disableElevation
            backgroundhovercolor='green'
            href={isAuthenticated ? '/account-info' : '/login'}
        >
            <ButtonIcon icon={MuiAccountCircleIcon} />
        </Button>
    )
}

export default AccountButton;