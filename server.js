const express = require('express');
const app = express();
const fetch = require('node-fetch');
const expressHandlebars = require('express-handlebars');
const helpers = require("./utils/helpers");
const port = process.env.PORT || 3000;

const expHbs = expressHandlebars.create({
  helpers,
});

app.set('view engine', 'handlebars');

app.engine('handlebars', expHbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/products', (req, res) => {
  //fetch products from API and pass them to the view
  res.render('products', {products: fetchedProducts});
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});



