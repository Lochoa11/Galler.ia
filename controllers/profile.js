const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('profile', { randomPerson: req.user })
});

router.get('/edit', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
