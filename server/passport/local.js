const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const { User } = require('../models/User');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          console.log('user:', user);
          if (!user) {
            //done(실패, 성공, 클라이언트 에러)
            return done(null, false, { message: 'Incorrect email.' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect password.' });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      },
    ),
  );
};
