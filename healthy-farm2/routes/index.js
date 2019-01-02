var express = require('express');
var router = express.Router();


const { 
  apiAddToCart,
  apiReduceCart,
  apiRemoveCart,
  getShoppingCart,
  getCheckout,
  postCheckout,
  getOrderComplete,
  getOrderDetail,
  deleteOrder
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

router.post('/checkout', postCheckout);

router.get('/order-complete/success', getOrderComplete);

router.get('/orders/:orderId', getOrderDetail);

router.get('/orders/delete/:orderId', deleteOrder);



module.exports = router;
