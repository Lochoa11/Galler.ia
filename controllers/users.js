const router = require('express').Router();
const models = require('../models');


router.get('/', (req, res) => {
  // TODO: render signup page
  res.send({
    msg: "Successful GET to '/users' route"
  });
});


router.post('/', (req, res) => {
  // TODO: validation here
  models.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/users' route",
    id: req.params.id,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/users' route",
    id: req.params.id,
  });
});

module.exports = router;
