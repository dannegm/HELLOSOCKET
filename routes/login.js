'use strict';

const passport = require ('passport');

module.exports = (app) => {
    require ('../strategies/google') (app);

    passport.serializeUser ((user, done) => {
        done (null, user);
    });

    passport.deserializeUser ((user, done) => {
        done (null, user);
    });

    app.all ('/auth/fail', (req, res) => {
        res
        .status (400)
        .json ({
            message: 'Unexpected error',
        });
    });
};