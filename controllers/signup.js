const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
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
    alert(err);
  });
});

module.exports = router;