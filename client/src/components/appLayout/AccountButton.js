import MuiAccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonIcon } from './AppLayoutStyles';

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
            backgroundColor='green'
        >
            <ButtonIcon icon={MuiAccountCircleIcon} />
        </Button>
    )
}

export default AccountButton;