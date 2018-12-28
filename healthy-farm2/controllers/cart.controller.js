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
  const oldUrl = req.session.oldUrl;

  if (req.user) {
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      cartUser.cart = req.session.cart;
      cartUser.save((err, result)=>{
        res.redirect('/products' + oldUrl);
      })
    })

  } else {
      res.redirect('/products' + oldUrl);
  }
}

module.exports = {
  addToCart,
  reduceCart,
  removeFromCart,
  updateCartUser,
}