const Users = require('../models/Users');

const userData = [
    {
        "email": "email@email.com",
        "password": "thisgoodPW",
        "location": 94509,
        "skill": "amateur",
    }
]

const userSeeds = () => Users.bulkCreate(userData);

module.exports = userSeeds;