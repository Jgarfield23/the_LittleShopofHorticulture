const router = require('express').Router();

const apiRoutes = require('./api');
const pathRoutes = require('./path-routes.js');

router.use('/', pathRoutes);
router.use('/api', apiRoutes);

module.exports = router;