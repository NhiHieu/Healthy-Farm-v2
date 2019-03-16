const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const adminController = require('../controllers/admin.controller');

router.use('/', middleware.isLoggedIn, adminController.isAuthAdmin);

router.get('/', (req, res, next)=> {
  res.render('admin/home');
})

router.get('/products', adminController.getProducts);

router.post('/products', adminController.postProduct);

router.patch('/products/:productId', adminController.editProduct);

router.delete('/products/:productId', adminController.deleteProduct);

router.get('/products/new', (req, res, next)=> {

  res.render('admin/new-product');
})

router.get('/users', adminController.getUsers);

router.get('/orders', adminController.getOrders);
module.exports = router;