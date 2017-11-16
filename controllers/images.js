// const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');

router.post('/', (req, res) => {
	models.Photos.create({
		title: "user profile pic",
		image_url: req.url,
		description: "none"
	}).then((something) =>{
		
	});
	console.log(req);
});

module.exports = router;
