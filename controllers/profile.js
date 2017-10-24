const router = require('express').Router();
const Redirect = require('../middlewares/redirect');

router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('profile', { randomPerson: req.user })
});

router.get('/edit', Redirect.ifNotLoggedIn(), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
