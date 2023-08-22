// this middleware can be added to routes that require a user to be logged in
const userAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    } else {
        next();
    }
};

module.exports = userAuth;