import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, TextField } from "./FormStyles";
import { fetchAuthenticationStatus, registerUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticatedStatus, selectIsAuthenticated } from '../features/auth/authSlice';


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isAuthenticatedStatus = useSelector(getIsAuthenticatedStatus);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            await registerUser({ username, password });

            dispatch(fetchAuthenticationStatus());

            navigate('/');
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
    }, [navigate, isAuthenticated, isAuthenticatedStatus])

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

    return (
        <Form>
            <Typography 
                variant='h2'
                sx={{
                    fontFamily: 'sans',
                    marginBottom: '1rem'
                }}
            >
                Register
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
                onClick={handleRegister} 
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
                Register
            </LoadingButton>
            <Typography variant='body1'>
                Already have a TaskFlow account? <Link to="/login">Login here</Link>
            </Typography>
        </Form>
    )
}

export default Register;