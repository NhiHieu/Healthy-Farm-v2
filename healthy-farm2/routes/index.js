var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const CartUser = require('../models/cartUser.model');

const { 
  apiAddToCart,
  apiReduceCart,
  apiRemoveCart,
  getShoppingCart,
  getCheckout
} = require('../controllers/cart.controller');

// home page 
router.get('/', (req, res, next)=> {
  res.render('pages/home');
})

// rewrite using ajax jquery
router.get('/cart/api/add-to-cart', apiAddToCart);

router.get('/cart/api/reduce-cart', apiReduceCart);

router.get('/cart/api/remove-from-cart', apiRemoveCart);

router.get('/shopping-cart', getShoppingCart);

router.get('/checkout', getCheckout);

router.post('/checkout', (req, res, next)=> {
  if (!req.session.cart) {
    res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  const order = new Order({
    user: req.user,
    cart: cart,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    orderDate: new Date(),
  })
  order.save((err, order)=> {
    console.log(req.body);
    req.flash('successMsg', 'buy products successfully');
    req.session.cart = null;
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      console.log(cartUser);
      cartUser.cart = null;
      console.log('buy success', cartUser.cart);
      cartUser.save((err, newCartUser)=>{
        if (err) {
          console.log(err);
        }
        console.log(newCartUser);
        res.redirect('/order-complete/success?orderId=' + order.id);
      })
    })
  })
  
})

router.get('/order-complete/success', (req, res, next)=> {
    Order.findById(req.query.orderId, (err, order)=> {
    if (!req.query.orderId) {
      res.render('error', {
        error: createError(404),
        message: 'your order not found'
      })
    } else 
    res.render('cart/order-complete', {
      order
    });
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



module.exports = router;
