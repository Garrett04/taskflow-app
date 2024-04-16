import { FormGroup, IconButton, InputAdornment, Typography, styled } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchAuthenticationStatus, loginUser } from '../services/authService';
import { getIsAuthenticatedStatus, selectIsAuthenticated } from '../features/auth/authSlice';

const Form = styled(FormGroup)(({ theme }) => ({
    width: '70%',
    border: '1px solid black',
    borderRadius: '2rem',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '3rem',
    backgroundColor: theme.palette.ochre.light,
}))

const TextField = styled(MuiTextField)(() => ({
    width: '50%',
    margin: '1rem auto'
}))

const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });

            dispatch(fetchAuthenticationStatus());

            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (isAuthenticatedStatus === 'fulfilled' && isAuthenticated) { 
            navigate('/');
        }
    }, [navigate, isAuthenticatedStatus, isAuthenticated])
    
    return (
        <Form >
            <Typography 
                variant='h2'
                sx={{
                    fontFamily: 'sans',
                    marginBottom: '1rem'
                }}
            >
                Login
            </Typography>
            <TextField 
                type="text"
                label="Username"
                name="username" 
                value={username}
                onChange={handleChange}
            />
            <TextField 
                type={showPassword ? 'text' : 'password'} 
                label="Password" 
                name="password"
                value={password}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleVisibility}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <LoadingButton 
                onClick={handleLogin} 
                variant='contained'
                sx={{
                    width: '50%',
                    margin: '1rem auto',
                    padding: '1rem',
                    fontSize: '1rem',
                }}
                color='primary'
                disableElevation
            >
                Login
            </LoadingButton>
        </Form>
    )
}

export default Login;