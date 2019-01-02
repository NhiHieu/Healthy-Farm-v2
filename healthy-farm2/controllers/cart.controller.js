const Product = require('../models/product.model');
const createError = require('http-errors');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const CartUser = require('../models/cartUser.model');


const getShoppingCart = (req, res, next) => {
  if (!req.session.cart) {
    res.render('cart/shopping-cart', { products: null })
  } else {
    let cart = new Cart(req.session.cart);
    Product.find({}).limit(4).exec((err, listProducts)=> {
      console.log(listProducts);
      if (listProducts) {
        res.render('cart/shopping-cart', { 
          products: cart.toArray(),  
          totalPrice: cart.totalPrice,
          listProducts
        });
      }
    })
    
  }
}

const getCheckout = (req, res, next)=> {
  console.log(req.session.cart);
  if (!req.session.cart) {
    console.log('call');
    res.redirect('/shopping-cart')
  } else {
    console.log('call2');
    let cart = new Cart(req.session.cart);
    res.render('cart/checkout', {
      listProducts: cart.toArray()
    });
  }
  
}

const postCheckout = (req, res, next)=> {
  if (!req.session.cart) {
    res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  const order = new Order({
    user: req.user,
    cart: cart,
    orderDate: new Date(),
    ...req.body,
  })
  order.save((err, order)=> {
    req.flash('successMsg', 'buy products successfully');
    req.session.cart = null;
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      cartUser.cart = null;
      cartUser.save((err, newCartUser)=>{
        if (err) {
          console.log(err);
        }
        res.redirect('/order-complete/success?orderId=' + order.id);
      })
    })
  })
  
}


const getOrderComplete = (req, res, next)=> {
  if (!req.query.orderId) {
    res.render('error', {
      error: createError(404),
      message: 'your order not found'
    })
  } else {
    res.render('cart/order-complete', {
      orderId: req.query.orderId,
    });
  }
}

const getOrderDetail = (req, res, next)=> {
  Order.findById(req.params.orderId, (err, order)=> {
    if (order) {
      let cart = new Cart(order.cart);
      order.items = cart.toArray();
      res.render('cart/order-detail', {
        order
      })
    }
  })
}

const deleteOrder = (req, res, next) => {
  console.log('called delete order', req.params.orderId);
  Order.deleteOne({ _id: req.params.orderId }, (err)=> {
    if (err) {
      console.log(err);
    }
    res.redirect('/user/profile');
  })
}
// api
//utiltis
const updateCartUser = (req, res, next) => {
  if (req.user) {
    CartUser.findOne({ user: req.user }, (err, cartUser)=>{
      cartUser.cart = req.session.cart;
      cartUser.save((err, result)=>{
      })
    })
  }
}
// add to cart
const apiAddToCart = (req, res, next)=> {
  let productId = req.query.productId;
  let quantity = parseInt(req.query.quantity) || 1;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product)=> {
    if (err) {
      res.json({
        message: "Failure"
      })
    }
    cart.add(product, product.id, quantity);
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
  console.log('remove cart is called', productId);
  updateCartUser(req, res, next);
  res.json({
    message: "Success",
    totalQuantity: req.session.cart.totalQuantity
  })
}

module.exports = {
  apiAddToCart,
  apiReduceCart,
  apiRemoveCart,
  getShoppingCart,
  getCheckout,
  postCheckout,
  getOrderComplete,
  getOrderDetail,
  deleteOrder
}