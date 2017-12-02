const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
	models.Subscriptions.findAll({
		where:{
			UserId: req.user.id,
		},
	}).then((Subscriptions) =>{
		const all = [];
		Subscriptions.forEach((tuple)=>{			
			// console.log(tuple.dataValues.user);
			// console.log("I AM OVER HERE TYPING THIS **************************************");
			models.Users.findOne({
				where:{
					id: tuple.dataValues.user,
				},
			}).then((user) =>{				
				// res.render('feed', user.dataValues);
				// console.log(user.dataValues.firstName);
				const tempUserObject = [];
				tempUserObject.push({name:user.dataValues.firstName +" "+ user.dataValues.lastName});
				all.push(tempUserObject);
				// console.log(all);
				models.Photos.findAll({
					where:{
						UserId:user.id,
					},
				}).then((photos)=>{
					console.log(photos);
					
					// photos.forEach((photo) =>{
					// 	tempUserObject.push(photo);
					// });
				});
				// all.push(tempUserObject);
				// console.log(user.dataValues.firstName);
				// res.render('feed', user.dataValues);
			})

		});
		// console.log(all);
		// res.render('feed', all);
		// console.log(Subscriptions.dataValues.user);
		// const context = {
		// 	Subscriptions,
		// }
		// models.Photos.findAll({
		// 	where:{
		// 		UserId: Subscriptions.user,
		// 	},
		// })
		// res.render('feed', context);
	});
});

// router.get('/:id', (req, res) => {
//   models.Photos.findById(req.params.id).then((photo) => {
//     const context = { photo };
//     res.render('photos', context);
//   });
// });

module.exports = router;
