const Subtask = require('../models/Subtask');
const { updateTaskStatus } = require('../lib/updateTaskStatus');

const getAllSubtasksByUserId = async (req, res, next) => {
    const user_id = req.user.id;
    const { find_by_user_id } = req.query;

    if (!find_by_user_id) {
        return next();
    }

    const subtasks = await Subtask.findByUserId(user_id);

    if (!subtasks) {
        return res.status(404).json({ success: false, msg: "No subtasks found by user_id" });
    }

    res.json({
        success: true,
        subtasks
    });
}

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
        subtask: newSubtask
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

    if (!updatedTask) {
        return res.status(404).json({ success: false, msg: "subtask not found by id" });
    }

    if (typeof checked === 'boolean') {
        updatedTaskStatus = await updateTaskStatus(task_id);
    }

    res.json({
        success: true,
        subtask: updatedTask,
        task_status: updatedTaskStatus?.status,
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
    getAllSubtasksByUserId,
    getAllSubtasksByTaskId,
    getSubtaskById,
    createSubtask,
    updateSubtask,
    deleteSubtask
}