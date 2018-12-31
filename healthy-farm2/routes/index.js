var express = require('express');
var router = express.Router();
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const CartUser = require('../models/cartUser.model');

const { 
  apiAddToCart,
  apiReduceCart,
  apiRemoveCart
} = require('../controllers/cart.controller');

// home page 
router.get('/', (req, res, next)=> {
  let successMsg = req.flash('successMsg')[0];
  console.log('message from flash', successMsg);
  res.render('pages/home', {
    successMsg: successMsg,
    noMessages: !successMsg
  });
})

// rewrite using ajax jquery
router.get('/cart/api/add-to-cart', apiAddToCart);

router.get('/cart/api/reduce-cart', apiReduceCart);

router.get('/cart/api/remove-from-cart', apiRemoveCart);


router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    res.render('product/shopping-cart', { products: null})
  } else {
    let cart = new Cart(req.session.cart);
    res.render('product/shopping-cart', { 
      products: cart.toArray(),  
      totalPrice: cart.totalPrice
    });
  }
})

router.get('/checkout', isLoggedIn, (req, res, next)=> {
  if (!req.session.cart) {
    res.redirect('/shopping-cart')
  }
  res.render('product/checkout');
})

router.post('/checkout', isLoggedIn, (req, res, next)=> {
  if (!req.session.cart) {
    res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  const order = new Order({
    user: req.user,
    cart: cart,
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber
  })
  order.save((err, result)=> {
    console.log(req.body);
    req.flash('successMsg', 'buy products successfully');
    req.session.cart = null;
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      console.log(cartUser);
      cartUser.cart = null;
      console.log('buy success', cartUser.cart);
      cartUser.save((err, result)=>{
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.redirect('/');
      })
    })
  })
  
})

router.get('/test', (req, res, next)=> {
  let message = req.flash();
  console.log('get router test', message);
  res.render('test');
})
router.get('/test2', (req, res, next)=> {
  res.render('test2');
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/log-in');
}


module.exports = router;
