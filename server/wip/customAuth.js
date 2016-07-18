// import { Strategy as JwtStrategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';]
// import bcrypt from 'bcrypt-nodejs';

// export const passportJwtConfig = function () {
//   passport.use(new JwtStrategy({
//     secretOrKey: 'i like turtles',
//     jwtFromRequest: ExtractJwt.fromAuthHeader()
//   },
//       function(jwt, done) {
//         User.findOne({ id: jwt.sub })
//         .then((user) => {
//           if (user) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         })
//       .catch((err) => done(err, false));
//       }
//   ));
// };

// app.post('/signup', function(req, res) {
  // do server-side check of inputs

  // hash the password, store the user, redirect to /spots
//   auth.hashPassword(req.body.password)
//     .then((userToStore) => db.createUser(userToStore))
//     .then((results) => res.redirect('/spots'))
//     .catch((err) => res.send('error!'));
//
// });


// export const isAuthenticated = passport.authenticate('jwt', { session: false });
