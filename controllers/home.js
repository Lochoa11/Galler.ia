const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  models.Photos.findAll({
  	order: [['createdAt', 'DESC']],
  	limit: 20,  	
  }).then((photos) => {
  	res.render('home', { title: 'Home Page', photosList: photos });
  })
  
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;
