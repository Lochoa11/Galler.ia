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
			res.render('users/single', {
				user, 
				photos,
			});
		});
	}).catch(() => {		
	});
});

router.post('/follow', (req, res) => {	
	models.Subscriptions.create({
		user:req.body.UserId,//this is from the account user wants to follow
		UserId: req.user.id,//this is the user performing the "following"/"Subscribing"
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
