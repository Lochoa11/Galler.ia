const express = require('express');
const router = express.Router();
const users = require('./users')
//All routes go here

router.use('/', require('./home'));
router.use('/users', users);

module.exports = router;
