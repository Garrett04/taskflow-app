const passport = require('passport');

// To authneticate the request using JWT Strategy
// If authentication succeeds, user's information (i.e id) will be attached to the req.user property.
const isAuthenticated = (req, res, next) => {
    // Checks if there is a user session object i.e from google then proceed to the route.
    // else check for jwt token
    if (req.user) {
        return next();
    }

    passport.authenticate('jwt', { session: false }, (err, user) => {
        // If err or no user is found then there is no user logged in yet 
        // so return an authenticated of false.
        // else attach the user object to req.user property and proceed to the route.
        if (err || !user) {
            return res.json({ success: false, authenticated: false });
        }
        req.user = user;
        return next();
    })(req, res, next);
}

module.exports = {
    isAuthenticated
}