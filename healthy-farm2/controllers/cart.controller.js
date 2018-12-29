const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const CartUser = require('../models/cartUser.model');


const addToCart = (req, res, next) => {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product)=> {
    cart.add(product, product.id);
    req.session.cart = cart;
    next();
  })
}

const reduceCart = (req, res, next)=> {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduce(productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  next();
}

const removeFromCart = (req, res, next)=> {
  let productId = req.params.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  next();
}

const updateCartUser = (req, res, next) => {
  if (req.user) {
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      cartUser.cart = req.session.cart;
      cartUser.save((err, result)=>{
      })
    })
  }
}

// api
// add to cart
const apiAddToCart = (req, res, next)=> {
  let productId = req.query.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product)=> {
    if (err) {
      res.json({
        message: "Failure"
      })
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    updateCartUser(req, res, next);
    res.json({
      message: 'Success',
      totalQuantity: req.session.cart.totalQuantity
    })
  })
}

// reduce cart
const apiReduceCart = (req, res, next)=> {
  console.log('call api reduce')
  let productId = req.query.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduce(productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  updateCartUser(req, res, next);
  res.json({
    message: 'Success',
    totalQuantity: req.session.cart.totalQuantity
  })
}

// remove product from cart
const apiRemoveCart = (req, res, next)=> {
  let productId = req.query.productId;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  updateCartUser(req, res, next);
  res.json({
    message: "Success",
    totalQuantity: req.session.cart.totalQuantity
  })
}

module.exports = {
  addToCart,
  reduceCart,
  removeFromCart,
  updateCartUser,
  apiAddToCart,
  apiReduceCart,
  apiRemoveCart
}