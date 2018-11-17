'use strict';


const ctrl = require ('../controllers/UserController');

module.exports = (app) => {
    app
        .route('/user')
        .get ((req, res) => {
            res
            .status (200)
            .json (req.user);
        })
    ;

    app
        .route('/users')
        .get(ctrl.find)
        .post (ctrl.store)
    ;

    app
        .route('/user/:id')
        .get(ctrl.show)
        .put (ctrl.update)
        .delete (ctrl.delete)
    ;
};