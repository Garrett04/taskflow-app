const User = require("../models/User");
const utils = require('../lib/utils');

const getUserById = async (req, res) => {
    const userId = req.user.id;
    
    const user = await User.findById(userId);

    res.json({
        success: true,
        user: {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            login_method: user.login_method
        }
    })
}

const updateUser = async (req, res) => {
    const { username, first_name, last_name, old_password, new_password } = req.body;
    const userId = req.user.id;

    // Username Exists
    if (username) {
        const userExists = await User.findByUsername(username);

        if (userExists) {
            return res.status(400).json({
                success: false,
                reason: 'username exists',
                msg: "User with username already exists. Please try again."
            })
        }
    }

    // Password Validation
    const user = await User.findById(userId);
    const { pw_hash, pw_salt } = user;

    const isPasswordValid = utils.validatePassword(old_password, pw_hash, pw_salt);

    // if old password is not equal to the old password passed from the request body
    if (!isPasswordValid) {
        return res.status(401).json({ 
            success: false, 
            msg: "Invalid old password. Please try again." 
        });
    }

    // if new password is same as old password
    if (new_password === old_password) {
        return res.status(400).json({ 
            success: false, 
            msg: "New password is same as old password." 
        });
    }
    
    const { salt, hash } = utils.genPassword(new_password);

    const updatedUser = await User.update({ 
        id: userId, 
        username: username || user.username, 
        first_name: first_name || user.first_name, 
        last_name: last_name || user.last_name, 
        pw_hash: hash, 
        pw_salt: salt, 
    });

    // console.log(updatedUser);

    res.json({ 
        success: true,
        user: updatedUser
    })
};

module.exports = {
    getUserById,
    updateUser,
};