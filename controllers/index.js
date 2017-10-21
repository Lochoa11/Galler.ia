const express = require('express');
const home = require('./home');
const users = require('./users');
const login = require('./login');
const profile = require('./profile');
const signup = require('./signup');

// All routes go here
const router = express.Router();

router.use('/', home);
router.use('/users', users);
router.use('/login', login);
router.use('/profile', profile);
router.use('/signup', signup);

module.exports = router;
