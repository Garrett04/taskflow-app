const router = require('express').Router({ mergeParams: true });
const subtasksController = require('../controllers/subtasksController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// GET ROUTES
// get all subtasks by task_id.
router.get('/', isAuthenticated, subtasksController.getAllSubtasksByTaskId)

// get a subtask by its id.
router.get('/:id', isAuthenticated, subtasksController.getSubtaskById)

// POST ROUTES
// create new subtask
router.post('/', isAuthenticated, subtasksController.createSubtask)

// PUT ROUTES
// update a subtask
router.put('/:id', isAuthenticated, subtasksController.updateSubtask)

// DELETE ROUTES
// delete a subtask
router.delete('/:id', isAuthenticated, subtasksController.deleteSubtask)

module.exports = router;