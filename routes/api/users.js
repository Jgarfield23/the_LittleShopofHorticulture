// skeleton for admin/user routes, parameters are placeholders

// need to sign in users and create an authenticated session
// need to sign out users and destroy the authenticated session
// need to create a user profile
// need to update a user profile
// need to delete a user profile
const router = require('express').Router();
// didn't need to spread {} model name since there is only one model
const Users = require('../../models/Users'); // will replace with actual model name(s)
const bcrypt = require('bcrypt');

// root route, maybe move to server.js or index.js?
router.get('/', (req, res) => {
    res.send('Nothing to display yet')
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


/*router.get('/:id', async (req, res) => {
    try {
        const userProfile = await Users.findByPk(req.params.id);
        if (userProfile === null) {
            res.status(404).json({ message: 'Profile not found'})
            return;
        }
        res.status(200).json(userProfile)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Profile not found'})
    }
})

// this is supposed to update a user profile but is returning an array
// need to figure out how to return the updated profile
router.put('/:id', async (req, res) => {
    try {
        const userProfileUpdate = await Users.update( req.body, { where: { id: req.params.id }})
        if (userProfileUpdate[0] === null) {
            res.status(404).json({ message: 'Profile not found' })
            return;
        }
        console.log(req.params.id)
        res.status(200).json(userProfileUpdate)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Profile not found' })
    }
});*/

// combined /:id routes into one route
// this can retrieve a user profile, should probably render a page with the profile info
// put route is supposed to update a user profile, but is returning an array
router.route('/:id')
    .get(async (req, res) => {
        try {
            const userProfile = await Users.findByPk(req.params.id);
            if (userProfile === null) {
                res.status(404).json({ message: 'Profile not found'})
                return;
            }
            res.status(200).json(userProfile)
            // res.render('profile', { userProfile })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Profile not found'})
        }
    })
    .put(async (req, res) => {
        try {
            const userProfileUpdate = await Users.update( req.body, { where: { id: req.params.id }})
            if (userProfileUpdate[0] === null) {
                res.status(404).json({ message: 'Profile not found' })
                return;
            }
            console.log(req.params.id)
            res.status(200).json(userProfileUpdate)
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Profile not found' })
        }  
    });

module.exports = router; // export routes