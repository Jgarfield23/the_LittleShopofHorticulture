
// Use JWT?

// const token = jwt.sign()

// this middleware can be added to routes that require a user to be logged in
const userAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    } else {
        next();
    }
};

module.exports = userAuth;

