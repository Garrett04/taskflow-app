const router = require('express').Router();
const utils = require('../lib/utils');
const User = require('../models/User');

// POST ROUTES
// Login of users who used custom jwt
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);

    if (!user) {
        return res.status(400).json({ success: false, msg: "User with username does not exist" });
    }

    const isValid = utils.validatePassword(password, user.pw_hash, user.pw_salt);

    // If password is valid then issue a JWT token
    if (isValid) {
        const { token } = utils.issueJwt(user);
        
        res.cookie('accessToken', token, {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: 'none',
            httpOnly: true,
            secure: true
        })

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } else {
        res.status(401).json({ success: false, msg: "Wrong password entered" });
    }
})

// Registering a new user using custom jwt strategy
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findByUsername(username);

    if (userExists) {
        return res.status(400).json({ success: false, msg: "User with username already exists." });
    }

    const saltHash = utils.genPassword(password);
    const { salt, hash } = saltHash;

    const newUser = await User.create({ username, hash, salt, login_method: 'custom' });

    const { token } = utils.issueJwt(newUser);


    res.cookie('accessToken', token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    res.json({
        success: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            login_method: newUser.login_method
        }
    })
})

module.exports = router;