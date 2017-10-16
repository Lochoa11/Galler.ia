const express = require('express');
const models = require('../models');

// const UsersController = {
    
//     registerRouter() {
//         const router = express.Router();
//         router.get('/users', this.index);
//         router.post('/users', this.create);
//         return router;
//     },

//     index(req, res) {
//         // models.Users.findAll()
//         //     .then((users) => {
//         //         res.render('users', {
//         //             users
//         //         });
//         //     });
//         res.send({
//             msg: "Successful GET to '/isers' route"
//         });
//     },
//     create(req, res) { //Promise
//         models.Users.create({
//                 email: req.body.email,
//                 password: req.body.password,
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name
//             })
//             // .then((user) => {
//             //     res.redirect('/users');
//             // })
//             .catch((err) => {
//                 console.log('ERROR while creating a new user');
//                 res.redirect('/error');
//             })
//     }
// };

// module.exports = UsersController.registerRouter();

const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        msg: "Successful GET to '/users' route"
    });
});

router.post('/', (req, res) => {

    
    res.json({
        msg: "Successful POST to '/users' route"
    });
});

router.put('/:id', (req, res) => {
    res.json({
        msg: "Successful PUT to '/users' route",
        id: req.params.id
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        msg: "Successful DELETE to '/users' route",
        id: req.params.id
    });
});

module.exports = router;
