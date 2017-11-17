const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');
const passport = require('../middlewares/authentication');

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
		// console.log(result);	
	});
});



router.post('/emailChange', (req, res) => {
	// console.log("in post")
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
		// console.log(result);
		
	});
});

router.post('/passwordChange', (req, res) => {
	// console.log(user.password);
	// oldPassword = models.Users.findOne({
	// 	where:{
	// 		'id':req.user.id,
	// 	}
	// });

	// if(req.body.oldPassword)
	// console.log('hello ' + oldPassword);
	// if(passport.passwordsMatch(req.user.newPassword,))

	// console.log(
	// 	passport.authenticate('local', {
	// 		successRedirect: '/profile',
	// 		failureRedirect: '/login',
	// 	})(req, res);
	// );

	  // passport.authenticate('local', {
	  //   successRedirect: '/settings',
	  //   failureRedirect: '/settings',
	  // })(req, res);	
});

// router.post('/', Redirect.ifLoggedIn(), (req, res) => {
//   passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//   })(req, res);
// });

// router.get('/logout', (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) return next(err);
//     req.logout();
//     res.redirect('/');
//   });
// });

module.exports = router;