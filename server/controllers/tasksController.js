const Task = require('../models/Task');

const getAllTasksByUserId = async (req, res) => {
    const userId = req.user.id;
    const status = req.query.status !== "undefined" ? req.query.status : undefined;
    const archived = req.query.archived === "true";
    let tasks;

    const data = {
        userId,
        status,
        archived
    }

    console.log(data);

    if ((status || !status) && !archived) {
        tasks = await Task.findByUserId(data);
    } else if (archived) {
        tasks = await Task.findArchivedByUserId(userId);
    } 

    if (!tasks) {
        return res.status(404).json({ success: false, msg: "No tasks found." });
    }

    res.json({
        success: true,
        tasks
    });
}

const getTaskById = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({ success: false, msg: "Task not found by id" });
    }

    res.json({
        success: true,
        task
    });
}

const createTask = async (req, res) => {
    const userId = req.user.id;

    const newTask = await Task.create(userId);

    res.status(201).json({
        success: true,
        task: newTask
    });
}

const updateTask = async (req, res) => {
    const { title, deadline_date, status, archived } = req.body;
    const { id } = req.params;

    // if (!title && !deadline_date && !status) {
    //     return res.status(404).json({ 
    //         success: false, 
    //         msg: "Please provide title/deadline_date/status to update task" 
    //     });
    // }

    const updatedTask = await Task.update({ id, title, deadline_date, status, archived });

    res.json({
        success: true,
        task: updatedTask
    })
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    const deletedTaskId = await Task.deleteById(id);

    if (!deletedTaskId) {
        return res.status(404).json({ success: false, msg: "Task does not exist" });
    }

    res.json({
        success: true,
        task_id: deletedTaskId
    });
}

module.exports = {
    getAllTasksByUserId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}