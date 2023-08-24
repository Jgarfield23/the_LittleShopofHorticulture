const router = require('express').Router();

const userAuth = require('../utils/auth');
const Users = require('../models/Users')

router.get('/', (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn
    })
});

// added profile page hbs with userAuth so only logged in users can see profile
router.get('/profile', userAuth, async (req, res) => {
    try {
      const userData = await Users.findByPk(req.session.user_id, { plain: true, attributes: { exclude: ['password'] } }) 
      
      const user = userData.get({ plain: true })
      // spread should create user object
      res.render('profile', {
        ...user,
        loggedIn: req.session.loggedIn
      }) 
    } catch (err) {
      console.error(err)
    }
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
