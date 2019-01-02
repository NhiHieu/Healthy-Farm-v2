const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const middleware = require('../middleware');

const getProductChunk = (products, chunkSize) => {
  let result = [];
  for (let i = 0; i < products.length; i+=chunkSize) {
    result.push(products.slice(i, i+chunkSize));
  }
  return result;
}

const shuffleArray = (arr)=> {
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random()*arr.length);
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
  return arr;
}

router.use((req, res, next)=> {
  res.locals.currentPage = 'products';
  next();
})
router.get('/', middleware.getOldUrl, (req, res, next)=> {
  Product.find((err, products)=>{
    let  productChunk = getProductChunk((products), 4);
    Category.find((err, result)=> {
      res.render('product/product-list', {
        products: productChunk,
        categories: result,
        currentSelect: null
      });
    })
  })
})

router.get('/categories/:cateId', middleware.getOldUrl, (req, res, next)=> {
  const cateId = req.params.cateId;
  Product.find({ category: cateId }, (err, products)=> {
    let productChunk = getProductChunk(products, 4);
    Category.find((err, result)=> {
      if (err) {
        res.redirect('/products');
      }
      let getCurrentSelect = '';
      for (let item of result) {
        if (item.id===cateId) {
          getCurrentSelect = item.name;
          break;
        }
      }
      res.render('product/product-list', {
        products: productChunk,
        categories: result,
        currentSelect: getCurrentSelect
      });

    })
  })
})

router.get('/product-detail/:productId', middleware.getOldUrl, (req, res, next) => {
  const productId = req.params.productId;
  Product
    .findById(productId)
    .populate('category')
    .exec((err, product)=> {
    Product.find({ category: product.category.id }, (error, listProduct)=> {
      res.render('product/product-detail', {
        product,
        listProduct: listProduct.filter((pro)=>pro.id!==product.id).slice(0, 4)
      })
    })

  })
})

module.exports = router;