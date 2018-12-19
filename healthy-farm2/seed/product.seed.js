const Product = require('../models/product.model');
const Category = require('../models/category.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const env = require('dotenv');
env.config();

// connect to database
mongoose.connect(
  process.env.URI_LOCAL,{
    useNewUrlParser: true
  }
).then((result)=> {
  console.log('connect to database successfully');
}).catch((err)=>{
  console.log(err);
  process.exit();
})

// list categories
var categories = [];
Category
  .find()
  .exec()
  .then((result)=>{
    categories = result;
    // add some products 
    const products = [];
    Product.deleteMany((err, result)=>{

      // with catetory: fruits & vegetables
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/01/spinach-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/01/spinach-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/01/spinach-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/01/spinach-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/01/spinach-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[0].id)
      }))

      // with category: dairy & eggs
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'ca chua',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'ca chua da lat',
        price: 15000,
        category: new ObjectId(categories[1].id)
      }))

      // save to the database
      Product.insertMany(products, (err, result)=> {
        if (err) {
          console.log(err);
        }
        if (result) {
          console.log('insert product to database successfully');
        }
        process.exit();
      })
    })
  })
 


