const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});



router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;
