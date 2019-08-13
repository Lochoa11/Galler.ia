const express = require('express');
const home = require('./home');

const login = require('./login');
const profile = require('./profile');
const signup = require('./signup');

const photos = require('./photos');

const images = require('./images');
const settings = require('./settings');

const users = require('./users');
const feed = require('./feed');


// All routes go here
const router = express.Router();

router.use('/', home);

router.use('/login', login);
router.use('/profile', profile);
router.use('/signup', signup);

router.use('/photos', photos);

router.use('/images', images);
router.use('/settings', settings);

router.use('/users', users);
router.use('/feed', feed);


module.exports = router;
