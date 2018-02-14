const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users.js');
const passport = require('passport');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return done(err) }
      
      if(!user) {
        return done(null, false, {
          message: 'Username or password incorrect'
        });
      }
      
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Username or password incorrect'
        });
      }
      
      return done(null, user);
    });
}))