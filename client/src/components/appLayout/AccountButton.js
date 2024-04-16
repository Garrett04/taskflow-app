import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <Button 
            title='Your account' 
            aria-label='account-button' 
            color='ochre'
            variant='contained'
            onClick={handleClick}
            sx={{ width: '1rem', border: '1px solid black' }}
            size='small'
            disableElevation
        >
            <AccountCircleIcon color='secondary' sx={{ fontSize: '2.8rem' }}/>
        </Button>
    )
}

export default AccountButton;