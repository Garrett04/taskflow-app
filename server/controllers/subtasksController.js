const Subtask = require('../models/Subtask');

const getAllSubtasksByTaskId = async (req, res) => {
    const { task_id } = req.params;

    const subtasks = await Subtask.findByTaskId(task_id);

    if (!subtasks) {
        return res.status(404).json({ success: false, msg: "No subtasks found by task_id" });
    }

    res.json({
        success: true,
        subtasks
    });
}

const getSubtaskById = async (req, res) => {
    const { id } = req.params;

    const subtask = await Subtask.findById(id);

    if (!subtask) {
        return res.status(404).json({ success: false, msg: "No subtask found by id" });
    }

    res.json({
        success: true,
        subtask
    });
}

const createSubtask = async (req, res) => {
    const { title, description } = req.body;
    const { task_id } = req.params;

    if (!title) {
        return res.status(404).json({ success: false, msg: "Please provide subtask title" });
    }

    const newSubtask = await Subtask.create({ title, description, task_id });

    res.status(201).json({
        success: true,
        task: newSubtask
    });
}

const updateSubtask = async (req, res) => {
    const { title, description, checked } = req.body;
    const { id } = req.params;

    // if (!title && !description) {
    //     return res.status(404).json({ success: false, msg: "Please provide title/description to update subtask" });
    // }

    const updatedTask = await Subtask.update({ id, title, description, checked });

    res.json({
        success: true,
        subtask: updatedTask
    });
}

const deleteSubtask = async (req, res) => {
    const { id } = req.params;

    const deletedSubtaskId = await Subtask.delete(id);

    if (!deletedSubtaskId) {
        return res.status(404).json({ success: false, msg: "Subtask does not exist by id" });
    }

    res.json({
        success: true,
        subtask_id: deletedSubtaskId
    });
}

module.exports = {
    getAllSubtasksByTaskId,
    getSubtaskById,
    createSubtask,
    updateSubtask,
    deleteSubtask
}