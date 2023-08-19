const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', {layout: 'main'})
});

router.get('/products', (req, res) => {
    //fetch products from API and pass them to the view
    res.render('products', {layout: 'main'});
  });
  
module.exports = router;
