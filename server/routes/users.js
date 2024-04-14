const router = require('express').Router();
const { isAuthenticated } = require('./middlewares/authMiddleware');

// GET ROUTES
router.get('/:id', isAuthenticated, (req, res) => {
    res.send("Hello from protected route" + req.user.id);
})

module.exports = router;