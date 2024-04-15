const router = require('express').Router();
const { isAuthenticated } = require('./middlewares/authMiddleware');
const userController = require('../controllers/userController');

// GET ROUTES
// get a user by id
router.get('/', isAuthenticated, userController.getUserById)

// PUT ROUTES
// update a user by id
router.put('/', isAuthenticated, userController.updateUser)

module.exports = router;