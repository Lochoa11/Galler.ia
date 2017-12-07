const router = require('express').Router();
const models = require('../models');

router.get('/:id', (req, res) => {
  models.Photos.findById(req.params.id).then((photo) => {
    const context = { photo };
    res.render('photos', context);
  });
});

module.exports = router;
