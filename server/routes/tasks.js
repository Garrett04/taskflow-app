const { isAuthenticated } = require('../middlewares/authMiddleware');
const tasksController = require('../controllers/tasksController');
const router = require('express').Router();

// GET ROUTES
// to get all tasks by user id
router.get('/', isAuthenticated, tasksController.getAllTasksByUserId)

// to get a specific task
router.get('/:id', isAuthenticated, tasksController.getTaskById)

// POST ROUTES
// To create a new task
router.post('/', isAuthenticated, tasksController.createTask)

// PUT ROUTES
// To update a task's title or deadline_date or status
router.put('/:id', isAuthenticated, tasksController.updateTask)

// DELETE ROUTE
// delete a task by id
router.delete('/:id', isAuthenticated, tasksController.deleteTask);

router.use('/:task_id/subtasks', require('./subtasks'));

module.exports = router;