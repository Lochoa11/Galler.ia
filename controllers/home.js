const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('home/signup');
});

router.post('/signup', (req, res) => {
  // TODO: validation logic here
  models.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }).then(() => {
    res.redirect('login');
  }).catch((err) => {
    res.redirect('/signup');
    alert(err);
  });
});

// router.get('/login', (req, res) => {
//   res.render('home/login'); // folder structure in views
// });

// router.post('/login', (req, res) => {
//   // TODO: Logic to check if successfully authenticated
//   res.render('/');
// });

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;
