const express = require('express');
const home = require('./home');
// const users = require('./users');
const login = require('./login');
const profile = require('./profile');
const signup = require('./signup');
const images = require('./images');
const settings = require('./settings');

// All routes go here
const router = express.Router();

router.use('/', home);
// router.use('/users', users);
router.use('/login', login);
router.use('/profile', profile);
router.use('/signup', signup);
router.use('/images', images);
router.use('/settings', settings);

module.exports = router;
