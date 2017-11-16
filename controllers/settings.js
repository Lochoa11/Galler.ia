const router = require('express').Router();
const models = require('../models');
const Redirect = require('../middlewares/redirect');


router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('settings');
});

router.put('/', (req, res) => {
	// console.log(req.body.newFirst);
	// models.Users.update()
	// console.log(req.user.id);
	// models.Users.update(
	// 	{
	// 		firstName:req.body.newFirst
	// 	}, {
	// 		where:{
	// 			email = req.user.email
	// 		}
	// 	}
	// )
	// models.Users.find({where:{id = req.Users.id}})
	// .on('success', function (user) {
	// 	if(user){
	// 		console.log(user)
	// 		user.updateAttributes({
	// 			firstName: req.body.newFirst,
	// 		})
	// 	}
	// })
});

// router.post('/settings', (req, res) => {
	
// });

// router.post('/settings', (req, res) => {
	
// });

// router.get('/logout', (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) return next(err);
//     req.logout();
//     res.redirect('/');
//   });
// });

module.exports = router;