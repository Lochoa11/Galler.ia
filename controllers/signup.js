const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');

router.get('/', Redirect.ifLoggedIn(), (req, res) => {
  res.render('signup');
});

router.post('/', Redirect.ifLoggedIn(), (req, res) => {
  // TODO: validation logic here
  models.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }).then(() => {
    res.redirect('profile');
  }).catch((err) => {
    res.redirect('/');
    // show error
  });
});

module.exports = router;
