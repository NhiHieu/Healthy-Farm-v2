var express = require('express');
var router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

// home page 
router.get('/', (req, res, next)=> {
  res.render('pages/home');
})

router.get('/add-to-cart/:productId', (req, res, next) => {
  let productId = req.params.productId;
  let cart = new Cart( req.session.cart ? req.session.cart : {} );
  Product.findById(productId, (err, product)=> {
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/products');
  })
})

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    res.render('products/shopping-cart', { products: null})
  } else {
    let cart = new Cart(req.session.cart);
    res.render('product/shopping-cart', { 
      products: cart.toArray(),  
      totalPrice: cart.totalPrice
    });
  }
})

router.get('/checkout', (req, res, next)=> {
  if (!req.session.cart) {
    res.redirect('/shopping-cart')
  }
  res.render('product/checkout');
})
module.exports = router;
