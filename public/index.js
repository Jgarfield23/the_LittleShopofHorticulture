const express = require('express');
const { sequelize } = require('./models');

const app = express();

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
