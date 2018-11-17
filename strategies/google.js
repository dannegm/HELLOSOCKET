'use strict';

const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth').OAuth2Strategy;

const { credentials } = require ('../config/settings');
const { UserSchema } = require ('../schemas');

module.exports = (app) => {
    passport.use (
        new GoogleStrategy (
            {
                clientID: credentials.google.CLIENT_ID,
                clientSecret: credentials.google.CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const data = {
                        name: `${profile.name.givenName} ${profile.name.familyName}`,
                        email: profile.emails [0].value,
                        photoUrl: profile.photos [0].value,
                        credentials: {
                            accessToken,
                        },
                    };
                    const user = await (new UserModel ()).upsert (data);
                    return done (null, user);
                } catch (e) {
                    return done (e);
                }
            }
        )
    );

    app.get ('/auth/google', passport.authenticate ('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
    app.get ('/auth/google/callback', passport.authenticate ('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect ('/user');
    });
};