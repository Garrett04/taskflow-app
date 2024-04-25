const Subtask = require('../models/Subtask');
const Task = require('../models/Task');
const { updateTaskStatus } = require('../lib/updateTaskStatus');

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

    await updateTaskStatus(task_id);

    res.status(201).json({
        success: true,
        task: newSubtask
    });
}

const updateSubtask = async (req, res) => {
    const { title, description, checked } = req.body;
    const { task_id, id } = req.params;
    let updatedTaskStatus;

    // if (!title && !description) {
    //     return res.status(404).json({ success: false, msg: "Please provide title/description to update subtask" });
    // }

    const updatedTask = await Subtask.update({ id, title, description, checked });
    
    // console.log(title, description, checked);

    if (typeof checked === 'boolean') {
        updatedTaskStatus = await updateTaskStatus(task_id);
    }

    res.json({
        success: true,
        subtask: updatedTask,
        task_status: updatedTaskStatus.status,
    });
}

const deleteSubtask = async (req, res) => {
    const { task_id, id } = req.params;
    let updatedTaskStatus;
    const deletedSubtaskId = await Subtask.delete(id);

    if (!deletedSubtaskId) {
        return res.status(404).json({ success: false, msg: "Subtask does not exist by id" });
    }

    updatedTaskStatus = await updateTaskStatus(task_id);

    res.json({
        success: true,
        subtask_id: deletedSubtaskId,
        task_status: updatedTaskStatus.status,
    });
}

module.exports = {
    getAllSubtasksByTaskId,
    getSubtaskById,
    createSubtask,
    updateSubtask,
    deleteSubtask
}