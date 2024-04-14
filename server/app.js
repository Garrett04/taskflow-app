const express = require('express');
const app = express();

const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/config');

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

// PASSPORT AUTHENTICATION
require('./app/passport/JWTStrategy')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})