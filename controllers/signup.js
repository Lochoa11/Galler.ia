const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');
// const profilePic = require('../public/images/profile-default.jpg');
// const coverPic = require('../public/images/background.jpg');

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
    profilePicture: null,
    coverPicture: null,
  }).then((user) => {
    req.login(user, () =>
      res.redirect('/profile')
    );
  }).catch((err) => {
    console.log("hello BLAH BLAH BLAH" +err);
    res.redirect('/');
  });
});

module.exports = router;