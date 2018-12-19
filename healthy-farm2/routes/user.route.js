const express = require('express');
const User = require('../models/user.model');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');

const router = express.Router();

router.use(csrfProtection);

router.get('/log-out', isLoggedIn, (req, res, next)=> {
  req.logout();
  res.redirect('/');
})

router.get('/profile', isLoggedIn, (req, res, next)=> {
  console.log(req.user);
  res.render('user/profile', {
    user: req.user
  });
})

router.use('/', notLoggedIn, (req, res, next)=> {
  next();
})

router.get('/sign-up', (req, res, next)=> {
  const message = req.flash('error');
  console.log(message);
  res.render('user/signup', {
    csrf: req.csrfToken(),
    message,
    hasError: message.length>0
  });
})

router.post('/sign-up', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/sign-up',
  failureFlash: true
}))

router.get('/log-in', (req, res, next)=> {
  const message = req.flash('error');
  console.log(message);
  res.render('user/login', {
    csrf: req.csrfToken(),
    message,
    hasError: message.length>0
  });
})
router.post('/log-in', passport.authenticate('local.login', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/log-in',
  failureFlash: true
}))



//middlware to authenticate
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;