const Product = require('../models/product.model');
const Category = require('../models/category.model');
const mongoose = require('mongoose');

// connect to database
mongoose.connect(
  "mongodb://localhost:27017/healthy-farm2",{
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



  let done = 0;
  for (let i = 0; i < categories.length; i++) {
    categories[i].save().then(()=>{
      done++;
      if (done==categories.length){
        mongoose.disconnect();
      }
    })
  }

  
})