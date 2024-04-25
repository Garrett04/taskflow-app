const Subtask = require("../models/Subtask");
const Task = require("../models/Task");
const { isAfter } = require('date-fns');

// if checked was updated then to check for that specific tasks subtasks
// if all of the subtasks are checked then to update task status to completed
// else dont do anything
const updateTaskStatus = async (task_id) => {
    let task_status;

    const taskSubtasks = await Subtask.findByTaskId(task_id);

    // if there is no subtasks then consider it idle.
    if (!taskSubtasks) {
        task_status = await Task.update({ id: task_id, status: 'idle' });
        return task_status;
    }

    const { deadline_date } = await Task.findById(task_id);
    
    const isTaskSubtasksChecked = taskSubtasks.every(subtask => subtask.checked === true);

    console.log(isTaskSubtasksChecked);

    if (isTaskSubtasksChecked) {
        task_status = await Task.update({ id: task_id, status: 'completed' });
    } else if (deadline_date) {
        const currentDate = new Date();
        // not relying on cron schedule and immediatly updating task status
        if (isAfter(currentDate, deadline_date)) {
            task_status = await Task.update({ id: task_id, status: 'overdue' });
        } else {
            task_status = await Task.update({ id: task_id, status: 'pending' });
        }
    } else {
        task_status = await Task.update({ id: task_id, status: 'idle' });
    }

    // console.log(task_status);
    return task_status;
}

module.exports = {
    updateTaskStatus
}