// creating routes for user model that represents a user profile
// need to sign in users and create an authenticated session
// need to sign out users and destroy the authenticated session
// need to delete a user profile
const router = require('express').Router();
// didn't need to spread {} model name since there is only one model
const Users = require('../../models/Users'); // will replace with actual model name(s)
const bcrypt = require('bcrypt');

// root route, maybe move to server.js or index.js?
router.get('/', (req, res) => {
    res.send('Nothing to display yet')
    /*
    // view engine is not set up for this, we can use handlebars or ejs to render an html page- can likely use this for other routes

    res.render('index', (err, html) => {
        return html ? res.send(html) : res.send(err)
    }); 
    */
});

// this can be used to create a new user/signup
// does it make more sense to have this route be /signup? or '/' since we assume users will login on homepage?
// should there be a separate route for login/logout?
router.post('/register', async (req, res) => {
    // create new instance of user model
    try {
        // newUser will go to schema model, hashed password should be created here
        // const bcryptPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = await Users.create({
            email: req.body.email,
            password: req.body.password,
            location: req.body.location, // pull zip code from provided address
            skill: req.body.skill, // skill level with plant care
        });
        res.status(200).json(newUser);
        // res.redirect('/login')
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Cannot create user' })
    }
});

// this can be used to login a user and create an authenticated session
// does it make more sense to code login/logout functions as model methods or callback functions within the routes?
router.post('/login', async (req, res) => {
    try {
        // where: { email. req.body.email } is pulled from model
        const userData = await Users.findOne({ where: { email: req.body.email }, raw: true });
        
        if (userData === null) {
            res.status(404).json({ message: 'Login failed' })
            return;
        }
        // validate password, should compare to hashed password in database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (validPassword === null) {
            res.status(400).json({ message: 'Login failed' })
            return;
        }
        res.status(200).json({ message: 'Login successful' });
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Login failed' })
    }
});

// combined /:id routes into one route
// this can retrieve a user profile, should probably render a page with the profile info
// put route is supposed to update a user profile, now updates profile based on req.params.id
router.route('/:id')
    .get(getUserProfile, async (req, res) => {
        res.json(res.userProfile)
    })
    // this is a patch route that should update specific fields in a user profile, can be used instead of the put route
    .patch(getUserProfile, async (req, res) => {
        if (req.body.email != null) {
            res.userProfile.email = req.body.email;
        }
        if (req.body.password != null) {
            res.userProfile.password = req.body.password;
        }
        if (req.body.location != null) {
            res.userProfile.location = req.body.location;
        }
        if (req.body.skill != null) {
            res.userProfile.skill = req.body.skill;
        }
        try {
            const updatedUserProfile = await res.userProfile.save();
            res.status(200).json(updatedUserProfile);
        } catch (err) {
            console.error(err)
            res.status(400).json({ message: 'Profile not found' })
        }
    }) 
   
// middleware function to get a user profile by req.params.id
async function getUserProfile(req, res, next) {
    let userProfile;
    try {
        userProfile = await Users.findByPk(req.params.id);
        if (userProfile === null) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unexpected error'})
        return;
    }
    res.userProfile = userProfile;
    next();
}

module.exports = router; // export routes