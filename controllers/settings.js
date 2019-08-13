const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');
const passport = require('../middlewares/authentication');
const bcrypt = require('bcrypt-nodejs');

router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('settings');
});

router.post('/nameChange', (req, res) => {
	models.Users.update(
		{
			firstName:req.body.newFirst.substr(0,1).toUpperCase()+req.body.newFirst.substr(1),
			lastName: req.body.newLast.substr(0,1).toUpperCase()+req.body.newLast.substr(1),
		}, {
			where:{
				id: req.user.id,
			},
			returning: true,
			plain: true,		
		}
	).then((result) => {				
		res.render('settings', {
			nameChange:true,
			newFirstName: result[1]["dataValues"]["firstName"],
			newLastName: result[1]["dataValues"]["lastName"],
		})
	});
});

router.post('/emailChange', (req, res) => {
	models.Users.update(
		{
			email:req.body.email,
		},
		{
			where: {
				id: req.user.id,
			},
			returning:true,
			plain:true,
		}
	).then((result) => {				
		res.render('settings', {
			emailChange:true,
			newEmail:result[1]["dataValues"]["email"],
		})		
	});
});

router.post('/passwordChange', (req, res) => {
	console.log("hash1 " + req.user.password);
	if(passport.passwordsMatch(req.body.oldPassword, req.user.password)){
		console.log(req.body.oldPassword);
		let newHash = bcrypt.hashSync(req.body.newPassword);
		console.log("hash2 " + newHash);
		models.Users.update(
			{
				password: newHash,
			},
			{
				where:{
					id: req.user.id,
				},
				returning: true,
				plain:true,
			}
		).then(result => {
			res.render('settings', {
				passwordChanged: true,
				keepOpen: true,
			});
		});
	}else{
		res.render('settings', {
			cannotChangePassword: true,	
			keepOpen: true,		
		})
	}	
});

module.exports = router;