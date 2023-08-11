// skeleton for admin/user routes, parameters are placeholders

// need to sign in users and create an authenticated session
// need to sign out users and destroy the authenticated session
// need to create a user profile
// need to update a user profile
// need to delete a user profile
const router = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt');

// root route, maybe move to server.js or index.js
router.get('/', (req, res) => {
    res.send('Nothing to display yet')
});

// this can be used to get a user profile
router.get('/users/:id (or whatever we name the path)', async (req, res) => {
    try {
        const userProfile = await User.findOne(req.params.id);
        if (!userProfile) {
            res.status(404).json({ message: 'Profile not found' })
            return;
        } 
        res.status(200).json(userProfile);
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
});

// this can be used to create a new user/signup
// does it make more sense to have this route be /signup?
// should there be a separate route for login/logout?
router.post('/users', async (req, res) => {
    // create new instance of user model
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            location: req.body.location, // pull zip code from provided address
            skill: req.body.skill, // skill level with plant care
        });
        // create a session with loggedIn variable set to true
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUser)
        })
        res.status(200).json(newUser);
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
});

// this can be used to login a user and create an authenticated session
router.post('/users/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(404).json({ message: 'Login failed'})
            return;
        }
        // validate password, should compare to hashed password in database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Login failed' })
            return;
        }
        // create a session with loggedIn variable set to true
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ message: 'Login successful' });
        })
        
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
});

// this can be used to logout a user and destroy the authenticated session
// does this need to be async?
router.post('/users/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

// this can be used to update a user profile
router.put('/users/:id', async (req, res) => {
    try {
        const userData = await User.update( req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!userData[0]) {
            res.status(404).json({ message: 'Profile not found' })
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
});

module.exports = router;