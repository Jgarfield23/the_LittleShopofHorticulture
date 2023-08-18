const uuid = require('uuid');

const users = {
    "user1": "password1",
    "user2": "password2"
}

class Session {
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }

    isExpired() {
        return this.expiresAt < new Date();
    }
}

const signinHandler = (req, res) => {
    // Your signinHandler code
}

const welcomeHandler = (req, res) => {
    // Your welcomeHandler code
}

const refreshHandler = (req, res) => {
    // Your refreshHandler code
}

const logoutHandler = (req, res) => {
    // Your logoutHandler code
}

module.exports = {
    signinHandler,
    welcomeHandler,
    refreshHandler,
    logoutHandler
};
