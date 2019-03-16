const Category = require('../models/category.model');
const mongoose = require('mongoose');
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
// create category
Category.deleteMany((err, result)=>{

  const categories = [];
  categories.push(new Category({
    name: 'Fruits & Vegetables'
  }))
  categories.push(new Category({
    name: 'Dairy & Eggs'
  }))
  categories.push(new Category({
    name: 'Meat & Fish'
  }))
  categories.push(new Category({
    name: 'Drink'
  }))
  categories.push(new Category({
    name: 'Bakery'
  }))

  Category.insertMany(categories, (err, result)=> {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log('insert categories to database successfully');
    }
    process.exit();
  })
  
})