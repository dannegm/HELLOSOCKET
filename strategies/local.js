'use strict';

const passport = require ('passport');
const LocalStrategy = require ('passport-local');

const { UserModel } = require ('../models');

module.exports = (app) => {
    passport.use (
        new LocalStrategy (
            async (username, password, done) => {
                try {
                    const user = await UserModel.verify ({ username, password });
                    app.outputs.json ('USER', user);
                    return done (null, user);
                } catch (e) {
                    return done (e);
                }
            }
        )
    );

    app.post ('/auth/local', passport.authenticate ('local', { failureRedirect: '/auth/fail' }), (req, res) => {
        res.redirect ('/user');
    });
};