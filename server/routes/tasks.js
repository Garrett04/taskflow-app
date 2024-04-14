const Task = require('../models/Task');
const { isAuthenticated } = require('./middlewares/authMiddleware');

const router = require('express').Router();

// GET ROUTES
// to get all tasks by user id
router.get('/', isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    const tasks = await Task.findByUserId(userId);

    if (!tasks) {
        return res.status(404).json({ success: false, msg: "No tasks found." });
    }

    res.json({
        success: true,
        tasks
    });
})

// to get a specific task
router.get('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({ success: false, msg: "Task not found by id" });
    }

    res.json({
        success: true,
        task
    });
})

// POST ROUTES
// To create a new task
router.post('/', isAuthenticated, async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(404).json({ success: false, msg: "Please provide task title." });
    }

    const newTask = await Task.create({ title, userId });

    res.status(201).json({
        success: true,
        task: newTask
    });
})

// PUT ROUTES
// To update a task's title or deadline_date or status
router.put('/:id', isAuthenticated, async (req, res) => {
    const { title, deadline_date, status } = req.body;
    const { id } = req.params;

    if (!title && !deadline_date && !status) {
        return res.status(404).json({ 
            success: false, 
            msg: "Please provide title/deadline_date/status to update task" 
        });
    }

    const updatedTask = await Task.update({ id, title, deadline_date, status });

    res.json({
        success: true,
        task: updatedTask
    })
})

// DELETE ROUTE
// delete a task by id
router.delete('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    const deletedTaskId = await Task.deleteById(id);

    if (!deletedTaskId) {
        return res.status(404).json({ success: false, msg: "Task does not exist" });
    }

    res.json({
        success: true,
        task_id: deletedTaskId
    });
});

router.use('/:task_id/subtasks', require('./subtasks'));

module.exports = router;