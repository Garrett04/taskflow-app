const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('./middlewares/authMiddleware');

// GET ROUTES
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

module.exports = router;