const router = require('express').Router();

// All routes
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;