const express = require('express');
const app = express();

const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/db/config');
const { UUIDv4 } = require('uuid-v4-validator');

// Useful middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS SETUP
app.use(cors({
    origin: [ process.env.CLIENT_URL, 'http://localhost:3001' ],
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
require('./config/cronJob');

// PASSPORT AUTHENTICATION
require('./config/passport/JWTStrategy')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/tasks/:id', (req, res, next) => {
    const { id } = req.params;

    if (id && !UUIDv4.validate(id)) {
        return res.status(400).json({ success: false, msg: "Invalid uuid parameter" });
    }

    next();
})

app.use('/api/tasks/:task_id/subtasks', (req, res, next) => {
    const { task_id } = req.params;

    if (task_id && !UUIDv4.validate(task_id)) {
        return res.status(400).json({ success: false, msg: "Invalid uuid parameter" });
    }

    next();
})


app.use('/api/tasks/:task_id/subtasks/:id', (req, res, next) => {
    const { task_id, id } = req.params;

    if ((task_id && id) && (!UUIDv4.validate(task_id) || !UUIDv4.validate(id))) {
        return res.status(400).json({ success: false, msg: "Invalid uuid parameters" });
    }

    next();
})

app.use('/api', require('./routes/index'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error: ' + err.message);
})

module.exports = app;