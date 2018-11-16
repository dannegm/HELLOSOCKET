'use strict';

const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth').OAuth2Strategy;
const { credentials } = require ('../config/settings');

module.exports = (app) => {
    passport.use (
        new GoogleStrategy (
            {
                clientID: credentials.google.CLIENT_ID,
                clientSecret: credentials.google.CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                const user = {
                    accessToken,
                    refreshToken,
                    profile
                };
                return done (null, user);
            }
        )
    );

    app.get ('/auth/google', passport.authenticate ('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get ('/auth/google/callback', passport.authenticate ('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect ('/user');
    });
};