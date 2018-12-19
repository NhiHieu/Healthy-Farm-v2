const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user.model');

passport.serializeUser((user, done)=> {
  done(null, user.id);
})

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user)=> {
    done(err, user);
  })
})

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done)=> {
  User.findOne({ 'email': email }, (err, res)=> {
    if (err) {
      console.log('error', err);
      return done(err);
    }
    if (res) {
      console.log('user', res);
      return done(null, false, { message: 'Email is already taken' })
    }
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username
    })
    newUser.email = email;
    newUser.password = newUser.hashPassword(password);
    newUser.save((err, user)=> {
      if (err) {
        return done(err);
      }
      return done(null, newUser)
    })
  })
}))

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=> {
  User.findOne({ 'email': email }, (err, user)=> {
    if (err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, { message: 'User\'s not found'})
    }
    if (user) {
      if (!user.validPassword(password)){
        return done(null, false, { message: 'Wrong password'})
      }
    }
    return done(null, user);
  })
}))