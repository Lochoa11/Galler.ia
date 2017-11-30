const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
	models.Subscriptions.findAll({
		where:{
			UserId: req.user.id,
		},
	}).then((Subscriptions) =>{
		console.log(Subscriptions);
		// console.log(Subscriptions);
		// models.Photos.findAll({
		// 	where:{
		// 		UserId: Subscriptions.user,
		// 	}
		// })
		// const context = {
		// 	user:{
		// 		models.Users.findOne({
		// 			where:{
		// 				UserId:Subscriptions.user,
		// 			},
		// 		});
		// 	},
		// 	photos:{
		// 		models.Photos.findAll({
		// 			where:{
		// 				UserId:Subscriptions.user,
		// 			},
		// 		});
		// 	},
		// };
		const context = {
			Subscriptions,
		}
		// models.Photos.findAll({
		// 	where:{
		// 		UserId: Subscriptions.user,
		// 	},
		// })
		res.render('feed', context);
	});
});

// router.get('/:id', (req, res) => {
//   models.Photos.findById(req.params.id).then((photo) => {
//     const context = { photo };
//     res.render('photos', context);
//   });
// });

module.exports = router;
