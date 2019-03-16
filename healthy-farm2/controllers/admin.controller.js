const Role = require('../models/role.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

const isAuthAdmin = (req, res, next) => {
  const id = req.user.role;
  Role.findById(id, (err, role)=> {
    if (err) {
      next(err);
    }
    if (!role || role.key=='USER') {
      res.redirect('/');
    } else {
      next();
    }    
  })

}

/* manage product */
const getProducts = (req, res, next) => {
  Product
    .find()
    .populate('category')
    .exec((err, products)=> {
      if (err) {
        res.redirect('/admin');
      }
      Category.find({}, (error, categories)=> {
        res.render('admin/products', {
          products,
          categories
        })
      })
      
    })
}

const postProduct = (req, res, next) => {
  // name, imgUrl, description, price, unit, category
  let product = new Product({
    ...req.params
  });

  product.save((err, product)=> {
    if (err) {
      res.json({
        message: 'Failure'
      })
    }
    res.json({
      message: 'Success',
      product
    })
  })

}

const editProduct = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product
    .updateOne({ _id: id}, { $set: updateOps })
    .exec((err, product)=> {
      if (err) {
        res.json({
          message: 'Failure'
        })
      }
      res.json({
        message: 'Success'
      })
    })
    
}

const deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product
    .deleteOne({ _id: id})
    .exec((err, res)=> {
      if (err) {
        res.json({
          message: "Failure"
        })
      }
      res.json({
        message: "Success"
      })
    })
}
/* manage product */
// user
const getUsers = (req, res, next) => {
  User.find({}, (err, users)=> {
    res.render('admin/users', {
      users
    })
  })
}

const getOrders = (req, res, next)=> {
  Order.find({}).populate('user').exec((err, orders)=> {
    res.render('admin/orders', {
      orders
    })
  })
}
module.exports = {
  // authentication admin
  isAuthAdmin,
  // product
  getProducts,
  postProduct,
  editProduct,
  deleteProduct,
  // user
  getUsers,
  //order
  getOrders
}