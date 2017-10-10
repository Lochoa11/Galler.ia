const express = require('express');
const router = express.Router();

//All routes go here

router.use('/', require('./home'));
router.use('/users', require('./users'));

module.exports = router;
