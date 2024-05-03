import { IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchAuthenticationStatus, loginUser } from '../services/authService';
import { getIsAuthenticatedStatus, selectIsAuthenticated } from '../features/auth/authSlice';
import { Form, TextField } from './FormStyles';


const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            await loginUser({ username, password });

            dispatch(fetchAuthenticationStatus());

            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate('/');
            }
        } catch (err) {
            setErrMsg(err.data.msg);
            setLoading(false);
            console.error(err);
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
            <Typography sx={{ color: 'red' }}>{errMsg}</Typography>
            <LoadingButton 
                onClick={handleLogin} 
                variant='contained'
                sx={{
                    width: '70%',
                    margin: '1rem auto',
                    padding: '1rem',
                    fontSize: '1rem',
                }}
                color='primary'
                disableElevation
                loading={loading}
            >
                Login
            </LoadingButton>
            <Typography variant='body1'>
                Do not have a TaskFlow account? <Link to="/register">Register here</Link>
            </Typography>
        </Form>
    )
}

export default Login;