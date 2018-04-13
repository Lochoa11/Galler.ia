const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  models.Users.findAll().then((users) => {
  	res.render('users', {
  		users,
  	});
  });
});

router.get('/:id', (req, res) => {
	models.Users.findOne({
		where:{
			id:req.params.id,
		},
	}).then((user) =>{
		models.Photos.findAll({
			order:['createdAt'],
			where:{
				UserId: user.id,
			}
		}).then((photos) =>{
			models.Subscriptions.findOne({
				where:{
					UserId: req.user.id,
					user: req.params.id,
				}
			}).then((subscription) => {
				res.render('users/single', {
					user, 
					photos,
					subscription,
				});
			});
		});
	}).catch(() => {		
	});
});

router.post('/follow', (req, res) => {	
	models.Subscriptions.create({
		user:req.body.UserId,//this is from the account user wants to follow
		UserId: req.user.id,//this is the user performing the "following"/"Subscribing"
	}).then(() => {
		models.Users.findOne({
			where:{
				id:req.body.UserId,
			},
		}).then((user) =>{
			models.Photos.findAll({
				order:['createdAt'],
				where:{
					UserId: user.id,
				},
			}).then((photos) =>{
				models.Subscriptions.findOne({
					where:{
						UserId: req.user.id,
						user: req.body.UserId,
					}
				}).then((subscription) => {
					res.render('users/single', {
						user, 
						photos,
						subscription,
					});
				});
			});
		}).catch(() => {		
		});
	});
});

router.post('/unfollow', (req, res) => {

	models.Subscriptions.destroy({
		where:{
			user: req.body.UserId,
			UserId: req.user.id,
		}
	}).then(() => {
		models.Users.findOne({
			where:{
				id:req.body.UserId,
			},
		}).then((user) =>{
			models.Photos.findAll({
				order:['createdAt'],
				where:{
					UserId: user.id,
				},
			}).then((photos) =>{
				res.render('users/single', {
					user, 
					photos,
				});
			});
		}).catch(() => {		
		});
	});
});

module.exports = router;



// module.exports = {
//   registerRouter() {
//     const router = express.Router();

//     router.get('/', this.index);
//     router.get('/:username', this.show);

//     return router;
//   },
//   index(req, res) {
//     models.User.findAll().then((user) => {
//       res.render('users', {
//         user,
//       });
//     });
//   },
//   show(req, res) {
//     models.User.findOne({
//       where: { username: req.params.username },
//     }).then((user) => {
//       models.Post.findAll({
//         where: { email: user.email },
//       }).then((post) => {
//         res.render('users/single', {
//           user,
//           post,
//         });
//       });
//     }).catch(() => {
//       res.render('users/single');
//     });
//   },
// };
