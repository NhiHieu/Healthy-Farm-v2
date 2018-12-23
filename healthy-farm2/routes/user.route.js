const express = require('express');
const User = require('../models/user.model');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const router = express.Router();

router.use(csrfProtection);

router.get('/log-out', isLoggedIn, (req, res, next)=> {
  req.logout();
  res.redirect('/');
})

router.get('/profile', isLoggedIn, (req, res, next)=> {
  //console.log(req.user);
  Order.find({ user: req.user }, (err, orders)=> {
    if (err) {
      return res.write('error');
    }
    orders.forEach(order=> {
      let cart = new Cart(order.cart);
      order.items = cart.toArray();
    })
    console.log(orders[0].items[0].item.name);
    res.render('user/profile', {
      user: req.user,
      orders: orders
    });
  })

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
  failureRedirect: '/user/sign-up',
  failureFlash: true
}), (req, res, next)=> {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  res.redirect('/user/profile');
})

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
  failureRedirect: '/user/log-in',
  failureFlash: true
}), (req, res, next)=> {
  console.log(req.session.oldUrl);
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
})



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