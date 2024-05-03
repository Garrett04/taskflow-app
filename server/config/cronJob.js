const cron = require('node-cron');
const Task = require('../models/Task');
const { isAfter, differenceInDays } = require('date-fns');

// CRON SETUP
// Updates the task status to overdue if current time exceeds the deadline date
const updateTaskStatus = async () => {
    const currentDate = new Date();

    const tasks = await Task.find();

    tasks.forEach(
        async ({id, deadline_date, status}) => {
        if (isAfter(currentDate, deadline_date) && status === 'pending') {
            // change status of task to overdue
            const data = { id, status: "overdue" };
            const updatedTask = await Task.update(data);
            // console.log(updatedTask);
            // console.log("deadline date:", deadline_date);
            // console.log("current date:", currentDate);
        }
    })
}

// Permanently deletes a task if the current date exceeds the deleted at date by 20 days.
const deleteTask = async () => {
    const currentDate = new Date();

    const tasks = await Task.find();

    tasks.forEach(
        async ({ id, deleted_at, archived }) =>  {
            if (archived) {
                const difference = differenceInDays(currentDate, deleted_at);

                if (difference >= 30) {
                    const deletedTask = await Task.deleteById(id);
                    // console.log("deletedTask:", deletedTask);
                    // console.log("deleted_at:", deleted_at);
                }
                console.log("difference:", difference);
            }
        }
    )
}

// For every 1 minute
cronJob = cron.schedule("*/1 * * * *", async () => {
    try {
        await updateTaskStatus();
        await deleteTask();
    } catch (err) {
        throw err;
    }
}) 

module.exports = cronJob;