import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK } from '../config/fb';

export const facebookAuthConfig = function(findUser, createUser) {
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log('profileid', profile.id);
      return findUser({facebookId: profile.id})
      .then((user) => {
        console.log('user', user);
        console.log('emails', Object.keys(profile));
        if (user.length > 0) {
          console.log('user exists in DB');
          return user;
        } else {
          console.log('create new user');
          return createUser({
            facebookId: parseInt(profile.id),
            facebookAccessToken: accessToken,
            email: profile.emails[0].value, // fix this TODO
            name: `${profile.name.givenName} ${profile.name.familyName}`
          });
        }
      })
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
    });
  }
  ));
};
