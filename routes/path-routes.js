const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/login', (req, res) => {
  res.render('loginform')
})

router.get('/products', (req, res) => {
    //fetch products from API and pass them to the view
    res.render('products');
  });
  
module.exports = router;
