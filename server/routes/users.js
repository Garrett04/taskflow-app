const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('./middlewares/authMiddleware');

// GET ROUTES
// get a user by id
router.get('/', isAuthenticated, async (req, res) => {
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
})

// PUT ROUTES
// update a user by id
router.put('/', isAuthenticated, async (req, res) => {
    const { first_name, last_name } = req.body;
    const userId = req.user.id;

    if (!first_name && !last_name) {
        return res.status(404).json({ success: false, msg: "Please provide first_name/last_name to update user info" });
    }

    const updatedUser = await User.update({ id: userId, first_name, last_name });

    res.json({ 
        success: true,
        user: updatedUser
    })
})

module.exports = router;