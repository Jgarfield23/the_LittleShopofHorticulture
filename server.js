const express = require('express');
const fetch = require('node-fetch');
const expressHandlebars = require('express-handlebars');
const helpers = require("./utils/helpers");
const routes = require('./routes');
// merged for user routes and session
const path = require('path');
const session = require('express-session')
const sequelize = require('./connection/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3000;

const expHbs = expressHandlebars.create({
  helpers,
});

const app = express();

// app.set('view engine', 'handlebars');

app.engine('handlebars', expHbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(express.json());
app.use(routes);

// creating user session
// moved since session needs to be initialized before app.use

const userSession = {
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

}; 

app.use(session(userSession))

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/products', (req, res) => {
  // Fetch products from API and pass them to the view
  res.render('products', {products: fetchedProducts});
});

// Move Sequelize sync here
sequelize.sync({ force: true }).then(() => {

});
// app.use for routes needs to be after session
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(userSession))
app.use(routes);

// moved routes to path-routes.js

sequelize.sync({ force: false }).then(() => {

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    });
});








