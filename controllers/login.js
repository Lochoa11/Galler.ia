const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');

router.get('/', Redirect.ifLoggedIn(),(req, res) => {
  res.render('login');
});

router.post('/', Redirect.ifLoggedIn(), (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })(req, res);
});

module.exports = router;
