const userAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn
    })
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home')
  }
  res.render('loginform')
})

router.get('/products', userAuth, (req, res) => {
    //fetch products from API and pass them to the view
    res.render('products', { loggedIn: req.session.loggedIn })
  });

 router.get('/logout', (req, res) => {
    res.render('home')
  })
  
module.exports = router;
