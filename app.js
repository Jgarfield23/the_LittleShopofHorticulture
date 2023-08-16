const express = require('express');
const app = express();
const fetch = require('node-fetch');
const expressHandlebars = require('express-handlebars');
const port = process.env.PORT || 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.engine('handlebars', 'handlebars'({
    layoutsDIr: `${__dirname}/views/layouts`
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('main', {layout:  'index'});
});

app.get('/products', (req, res) => {
  //fetch products from API and pass them to the view
  res.render('products', {products: fetchedProducts});
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});


const fetch = require('node-fetch');

app.use(express.static('public'));

app.get('/api/plants', async (req, res) => {
  const endpoint = req.params.endpoint;
  const apiUrl = `GET https://perenual.com/api/species-list?page=1&key=sk-QuSe64daf50463a5f1880/${endpoint}`; 

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching API data:', error);
    res.status(500).json({ error: 'An error occurred while fetching API data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


