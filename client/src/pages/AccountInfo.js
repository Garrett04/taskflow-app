import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataStatus, selectUserData } from "../features/user/userSlice";
import { fetchUserData, updateUser } from "../services/userService";
import Edit from "@mui/icons-material/Edit";
import Done from "@mui/icons-material/Done";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@emotion/react";

const AccountInfo = () => {
    const theme = useTheme();
    const userDataStatus = useSelector(getUserDataStatus);
    const userData = useSelector(selectUserData);
    // Only for editing username
    const [editUsername, setEditUsername] = useState(false);
    // For editing everything else other than username
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        oldPassword: "",
        newPassword: "",
    });
    // If username exists it will be set to true else false
    const [usernameError, setUsernameError] = useState(false);

    // If invalid old password or same passwords then it will be set to true
    const [passwordError, setPasswordError] = useState(false);

    // if username or password updates have an error then set the error message 
    const [errMsg, setErrMsg] = useState("");

    // to show/hide old password
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();

    // fetch user data on first render
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch])

    // fills in the form fields with existing data if any.
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            username: userData.username,
            firstName: userData.first_name,
            lastName: userData.last_name
        }));
    }, [
        userData.username,
        userData.first_name,
        userData.last_name
    ])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleClick = () => {
        setIsEditMode(true);
    }

    const handleAccountUpdate = async () => {
        // resetting error states
        setPasswordError(false);
        setErrMsg("");

        try {
            const data = { 
                first_name: formData.firstName,
                last_name: formData.lastName, 
                old_password: formData.oldPassword,
                new_password: formData.newPassword 
            };

            // updates the user info
            await updateUser(data)

            // Reset edit states
            setIsEditMode(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                oldPassword: "",
                newPassword: "",
            }));
        } catch (err) {
            // Catches for error and sets it
            setErrMsg(err.data.msg);
            setPasswordError(true);
            
            console.error(err.data.msg);
        }
    }

    const handleUsernameUpdate = async () => {
        // Resets error states
        setUsernameError(false);
        setPasswordError(false);
        setErrMsg("");

        try {
            // updates the username by making a call to the server
            await updateUser({ 
                username: formData.username, 
                old_password: formData.oldPassword,
                new_password: formData.newPassword, 
            });

            // reset form states
            setEditUsername(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                oldPassword: "",
                newPassword: "",
            }))
        } catch (err) {
            // catching and seeting of error states
            setErrMsg(err.data.msg);
            if (err.data.reason === 'username exists') {
                setUsernameError(true);
            } else {
                setPasswordError(true);
            }
            console.error(err.data.msg);
        }
    }

    // to toggle the visibility of the password field from type of text to password and vice versa
    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }
    
    // renders a form to view/update user info. 
    const renderUserData = () => {
        if (userDataStatus === 'fulfilled') {

        
            return (
                <Box
                    sx={{
                        display: 'flex',
                        marginTop: '1rem',
                        justifyContent: 'center',
                        padding: '2rem 0',
                        width: '65%',
                        [theme.breakpoints.down('sm')]: {
                            width: '95%'
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: '65%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <TextField 
                            label="Username" 
                            name="username"
                            value={formData.username || ""}
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                readOnly: !editUsername,
                                endAdornment: (
                                    <>
                                    {!isEditMode 
                                    &&
                                        <InputAdornment position="end">
                                            {!editUsername
                                            ? (
                                                <IconButton
                                                    title="Edit Username" 
                                                    size="small" 
                                                    onClick={() => setEditUsername(true)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            )
                                            : (
                                                <IconButton
                                                    title="Submit" 
                                                    size="small" 
                                                    onClick={handleUsernameUpdate}
                                                >
                                                    <Done />
                                                </IconButton>
                                            )}
                                        </InputAdornment>}
                                    </>
                                )
                            }}
                            error={usernameError}
                            variant={!editUsername ? "filled" : "outlined"}
                        />
                        <TextField 
                            label="First Name" 
                            name="firstName"
                            value={formData.firstName || ""}
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                readOnly: !isEditMode
                            }}
                            variant={!isEditMode ? "filled" : "outlined"}
                        />
                        <TextField 
                            label="Last Name" 
                            name="lastName"
                            value={formData.lastName || ""}
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                readOnly: !isEditMode
                            }}
                            variant={!isEditMode ? "filled" : "outlined"}
                        />
                        <TextField 
                            label="Old Password" 
                            name="oldPassword"
                            type={!showPassword ? "password" : "text"}
                            value={formData.oldPassword}
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                readOnly: !isEditMode && !editUsername,
                                endAdornment: (
                                    <>
                                        {(isEditMode || editUsername)
                                        &&
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleVisibility}>
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>}
                                    </>
                                )
                            }}
                            error={passwordError}
                            variant={!isEditMode && !editUsername ? "filled" : "outlined"}
                        />
                        <TextField 
                            label="New Password"
                            name="newPassword" 
                            type="password"
                            value={formData.newPassword}
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                readOnly: !isEditMode && !editUsername
                            }}
                            error={passwordError}
                            variant={!isEditMode && !editUsername ? "filled" : "outlined"}
                        />
                        <Typography variant="body2" color="error">
                            {errMsg}
                        </Typography>
                        {!isEditMode
                        ? (
                            <Button disabled={editUsername} size="small" onClick={handleClick} variant="contained">
                                Update Account
                            </Button>
                        )
                        : (
                            <Button 
                                disabled={editUsername} 
                                onClick={handleAccountUpdate} 
                                variant="contained" 
                                color="success"
                            >
                                Submit
                            </Button>
                        )}
                    </Box>
                </Box>
            )
        }
    }

    let content;
    if (userDataStatus === 'pending') {
        content = <CircularProgress />;
    } else if (userDataStatus === 'fulfilled') {
        content = renderUserData();
    }

    
    return (
        <Box margin="7rem 0"
          sx={{
              display: 'flex',
              flexFlow: 'column wrap',
              justifyContent: 'center',
              alignItems: 'center',
          }}
        >
          <Typography 
              variant="h4"
          >
              Account Information
          </Typography>
          {content}
        </Box>
    )
}

export default AccountInfo;