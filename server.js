const path = require('path');
const express = require('express');
const session = require('express-session')
const routes = require('./routes');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection/connection');

const app = express();
const PORT = process.env.PORT || 3001;

/* const userSession = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60 * 60 * 2000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}; */

// app.use(session(userSession))
app.use(express.json());
app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })
});
