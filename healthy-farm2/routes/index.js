var express = require('express');
var router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

// home page 
router.get('/', getOldUrl, (req, res, next)=> {
  let successMsg = req.flash('successMsg')[0];
  console.log('message from flash', successMsg);
  res.render('pages/home', {
    successMsg: successMsg,
    noMessages: !successMsg
  });
})

router.get('/add-to-cart/:productId', (req, res, next) => {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, (err, product)=> {
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    const oldUrl = req.session.oldUrl;
    res.redirect('/products' + oldUrl);
  })
})

router.get('/reduce-to-cart/:productId', (req, res, next)=> {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduce(productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  res.redirect('/shopping-cart');

})

router.get('/remove-to-cart/:productId', (req, res, next)=> {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
})

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
    res.redirect('/');
  })
  
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/log-in');
}

function getOldUrl(req, res, next) {
  req.session.oldUrl = req.url;
  next();
}
module.exports = router;
