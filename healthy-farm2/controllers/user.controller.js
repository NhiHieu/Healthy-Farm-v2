const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const passport = require('passport');

const logout = (req, res, next)=> {
  req.logout();
  res.redirect('/');
}

const getProfile = (req, res, next)=> {
  //console.log(req.user);
  Order.find({ user: req.user }, (err, orders)=> {
    if (err) {
      return res.write('error');
    }
    if (orders.length>0) {
      orders.forEach(order=> {
        let cart = new Cart(order.cart);
        order.items = cart.toArray();
      })
    }
    res.render('user/profile', {
      user: req.user,
      orders: orders
    });
  })

}

const checkNotLoggedIn = (req, res, next)=> {
  next();
}

const apiLogin = (req, res, next)=> {
  passport.authenticate('local.login', (err, user, info)=>{
    console.log(user, err, info);
    if (err) { return next(err); }
    if(!user) {
      console.log('info', info);
      return res.json({
        hasError: true,
        message: info.message})
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ message: 'sucessfully'})
    });
  })(req, res, next)
}

const apiSignup = (req, res, next)=> {
  passport.authenticate('local.signup', (err, user, info)=>{
    console.log(user, err, info);
    if (err) { return next(err); }
    if(!user) {
      console.log('info', info);
      return res.json({
        hasError: true,
        message: info.message})
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ message: 'sucessfully'})
    });
  })(req, res, next)
}

module.exports = {
  logout,
  getProfile,
  checkNotLoggedIn,
  apiLogin,
  apiSignup
}