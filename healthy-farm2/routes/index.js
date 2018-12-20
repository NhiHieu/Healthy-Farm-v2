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


module.exports = router;
