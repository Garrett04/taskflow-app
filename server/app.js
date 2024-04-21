const express = require('express');
const app = express();

const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/db/config');
const cron = require('node-cron');
const { isAfter, differenceInDays, differenceInMinutes } = require('date-fns');
const Task = require('./models/Task');

const PORT = process.env.PORT || 3000;

// Useful middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS SETUP
app.use(cors({
    origin: [ process.env.CLIENT_URL ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

// SESSION SETUP
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool,
        tableName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}))

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
            console.log(updatedTask);
            // console.log("deadline date:", deadline_date);
            console.log("current date:", currentDate);
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
                const difference = differenceInMinutes(currentDate, deleted_at);

                if (difference >= 1) {
                    const deletedTask = await Task.deleteById(id);
                    console.log("deletedTask:", deletedTask);
                    console.log("deleted_at:", deleted_at);
                }

                console.log("difference:", difference);
            }
        }
    )
}

// For every 1 minute
cron.schedule("*/1 * * * *", async () => {
    try {
        await updateTaskStatus();
        await deleteTask();
    } catch (err) {
        throw err;
    }
}) 

// PASSPORT AUTHENTICATION
require('./config/passport/JWTStrategy')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})