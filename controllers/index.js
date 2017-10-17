const express = require('express');
const users = require('./users');
const login = require('./login');

// All routes go here
const router = express.Router();

router.use('/', require('./home'));
router.use('/users', users);
router.use('/login', login);

module.exports = router;
