const express = require('express');
const app = express();
const fetch = require('node-fetch');
const expressHandlebars = require('express-handlebars');
const helpers = require("./utils/helpers");
const routes = require('./routes');
// merged for user routes and session
const path = require('path');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection/connection');

const port = process.env.PORT || 3000;

const expHbs = expressHandlebars.create({
  helpers,
});

app.set('view engine', 'handlebars');

app.engine('handlebars', expHbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());
app.use(routes);
// app.use(session(userSession))

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

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/products', (req, res) => {
  //fetch products from API and pass them to the view
  res.render('products', {products: fetchedProducts});
});

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })
});







