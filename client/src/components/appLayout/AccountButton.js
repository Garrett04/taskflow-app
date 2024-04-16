import MuiAccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Button = styled(MuiButton)(() => ({
    '&.MuiButton-contained': {
        width: '1rem', 
        border: '1px solid black',
        '&:hover': {
            background: 'green'
        }
    }
}))

const AccountCircleIcon = styled(MuiAccountCircleIcon)(({ theme }) => ({
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    }
}))

const AccountButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <Button 
            title='Your account' 
            aria-label='account-button' 
            color='secondary'
            variant='contained'
            onClick={handleClick}
            size='small'
            disableElevation
        >
            <AccountCircleIcon />
        </Button>
    )
}

export default AccountButton;