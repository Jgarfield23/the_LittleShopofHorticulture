// creating routes for user model that represents a user profile
// need to sign in users and create an authenticated session
// need to sign out users and destroy the authenticated session
const router = require('express').Router();
// didn't need to spread {} model name since there is only one model
const Users = require('../../models/Users'); // will replace with actual model name(s)
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    // create new instance of user model

    try {
        // const bcryptPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = await Users.create({
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            skill: req.body.skill
        });

        const user = newUser.get({ plain: true })
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = newUser.id;
            req.session.email = newUser.email;
            // added res.render to render new user profile page
            res.render('profile', {
                ...user,
                loggedIn: req.session.loggedIn,
                message: 'Account created'
              }) 
        })
        
        console.log(newUser)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Cannot create user' })
    }
});

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
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            res.status(200).json({ message: 'Login successful' });
        })
        
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
    // this can delete a user profile
    .delete(getUserProfile, async (req, res) => {
        res.userProfile.destroy();
        res.status(200).json({ message: 'Profile deleted' });
    }) 

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).json({ message: 'Logout successful' })
        })
    } else {
        res.status(404).end();
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