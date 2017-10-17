const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // TODO: Logic to check if successfully authenticated
  res.render('/');
});

module.exports = router;
