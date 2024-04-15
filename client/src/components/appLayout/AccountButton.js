import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <IconButton 
            title='Your account' 
            aria-label='account-button' 
            color='secondary'
            onClick={handleClick}
        >
            <AccountCircleIcon sx={{ fontSize: '3.5rem' }}/>
        </IconButton>
    )
}

export default AccountButton;