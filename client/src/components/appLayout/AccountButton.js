import MuiAccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonIcon } from './AppLayoutStyles';

const AccountButton = () => {
    const navigate = useNavigate();

    // To navigate user to /account-info route.
    const handleClick = () => {
        navigate('/account-info');
    }

    return (
        <Button 
            title={'Your account'}
            aria-label='account-button' 
            color='secondary'
            variant='contained'
            onClick={handleClick}
            size='small'
            disableElevation
            backgroundhovercolor='green'
            href={'/account-info'}
        >
            <ButtonIcon icon={MuiAccountCircleIcon} />
        </Button>
    )
}

export default AccountButton;