const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

// POST ROUTES
// Login of users who used custom jwt
router.post('/login', authController.loginUser)

// Registering a new user using custom jwt strategy
router.post('/register', authController.registerUser)


// logs out the user
router.post('/logout', isAuthenticated, authController.logoutUser)


// GET ROUTES
// check authentication status
router.get('/check-authentication', isAuthenticated, authController.sendSuccessAuthenticationStatus);


module.exports = router;