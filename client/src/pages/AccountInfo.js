import { Box, Button, IconButton, Input, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataStatus, selectUserData } from "../features/user/userSlice";
import { fetchUserData, updateUser } from "../services/userService";
import Edit from "@mui/icons-material/Edit";
import Done from "@mui/icons-material/Done";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AccountInfo = () => {
    const userData = useSelector(selectUserData);
    const userDataStatus = useSelector(getUserDataStatus);
    const [editUsername, setEditUsername] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        oldPassword: "",
        newPassword: "",
    });
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch])

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
        setPasswordError(false);
        setErrMsg("");

        try {
            const data = { 
                first_name: formData.firstName,
                last_name: formData.lastName, 
                old_password: formData.oldPassword,
                new_password: formData.newPassword 
            };

            const updatedUser = await updateUser(data)

            console.log(updatedUser);

            setIsEditMode(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                oldPassword: "",
                newPassword: "",
            }));
        } catch (err) {
            setErrMsg(err.data.msg);
            setPasswordError(true);
            
            console.log(err)
            // throw err;
        }
    }

    const handleUsernameUpdate = async () => {
        setUsernameError(false);
        setPasswordError(false);
        setErrMsg("");

        try {
            await updateUser({ 
                username: formData.username, 
                old_password: formData.oldPassword,
                new_password: formData.newPassword, 
            });

            setEditUsername(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                oldPassword: "",
                newPassword: "",
            }))
        } catch (err) {
            setErrMsg(err.data.msg);
            if (err.data.reason === 'username exists') {
                setUsernameError(true);
            } else {
                setPasswordError(true);
            }
            console.log(err);
        }
    }

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }
    

    const renderUserData = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    border: '1px solid black',
                    width: '75%',
                    marginTop: '1rem',
                    justifyContent: 'center',
                    padding: '2rem 0',
                    borderRadius: '1rem'
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
                            size="small" 
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

    let content;
    if (userDataStatus === 'pending') {
        content = 'Loading...';
    } else if (userDataStatus === 'fulfilled') {
        content = renderUserData();
    }

    return (
      <Box margin="7rem 1rem"
        sx={{
            display: 'flex',
            flexFlow: 'column wrap',
            justifyContent: 'center',
            alignItems: 'center'
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