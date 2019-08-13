const router = require('express').Router();
const models = require('../models');

router.get('/:id', (req, res) => {
  models.Photos.findById(req.params.id).then((photo) => {
    // const context = { photo };
    // var isSelf = false;
    if(req.user.id === photo.UserId){
      res.render('photos', {
          photo,
          isSelf: true,
      });
    }
    else{
      res.render('photos', {
        photo,
        isSelf:false,
      });
    }
  });
});

router.post('/delete', (req, res) => {
  
  models.Photos.destroy({
    where:{
      id:req.body.photoID,
    }
  }).then(() => {
      res.render('photos/deleted');
  });
});
module.exports = router;
