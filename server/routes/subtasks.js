const router = require('express').Router({ mergeParams: true });
const SubTask = require('../models/SubTask');
const { isAuthenticated } = require('./middlewares/authMiddleware');

// GET ROUTES
// get all subtasks by task_id.
router.get('/', isAuthenticated, async (req, res) => {
    const { task_id } = req.params;

    const subtasks = await SubTask.findByTaskId(task_id);

    if (!subtasks) {
        return res.status(404).json({ success: false, msg: "No subtasks found by task_id" });
    }

    res.json({
        success: true,
        subtasks
    });
})

// get a subtask by its id.
router.get('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    const subtask = await SubTask.findById(id);

    if (!subtask) {
        return res.status(404).json({ success: false, msg: "No subtask found by id" });
    }

    res.json({
        success: true,
        subtask
    });
})

// POST ROUTES
// create new subtask
router.post('/', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const { task_id } = req.params;

    if (!title) {
        return res.status(404).json({ success: false, msg: "Please provide title" });
    }

    const newSubtask = await SubTask.create({ title, description, task_id });

    res.status(201).json({
        success: true,
        task: newSubtask
    });
})

// PUT ROUTES
// update a subtask
router.put('/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title && !description) {
        return res.status(404).json({ success: false, msg: "Please provide title/description to update subtask" });
    }

    const updatedTask = await SubTask.update({ id, title, description });

    res.json({
        success: true,
        task: updatedTask
    });
})

// DELETE ROUTES
// delete a subtask
router.delete('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    const deletedSubtaskId = await SubTask.delete(id);

    if (!deletedSubtaskId) {
        return res.status(404).json({ success: false, msg: "Subtask does not exist by id" });
    }

    res.json({
        success: true,
        subtask_id: deletedSubtaskId
    });
})

module.exports = router;