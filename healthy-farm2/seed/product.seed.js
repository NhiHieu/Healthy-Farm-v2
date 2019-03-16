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
        name: 'Banana',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/04/banana-1.jpg',
        description: 'Fresh and delicious for your desserts or smoothies/n Natural farming',
        price: 15000,
        unit: "500g banana",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'Beef tomato',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/04/ca-chua-beef-600x401.jpg',
        description: 'A tasty addition to any salad or side dish – rich in nutrients and taste amazing by themselves\n Refridgerated up to 7 days\n USDA organic certificate',
        price: 33000,
        unit: "500g of beef tomato big size",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'Beetroot',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/04/cu-den-600x402.png',
        description: 'Great source of nutrients and a wonderful ingredient for juice, salad, soup\n USDA organic certificate',
        price: 33000,
        unit: "500g",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'Bell pepper',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/04/ot-chuong-an-phu-600x434.jpg',
        description: 'Great addition to salads, vegetable sautee, or kebabs\n Naturally grown\n Refridgerated up to 7 days',
        price: 33000,
        unit: "500g bell pepper",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: 'Broccoli',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2018/04/sup_lo_xanh-600x376.jpg',
        description: 'Naturally grown\n Refridgerated up to 7 days',
        price: 33000,
        unit: "500g of broccoli",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: "Carrot",
        imgUrl: "https://healthyfarm.org/wp-content/uploads/2018/06/carrot-smile-farm-600x396.png",
        description: "Fresh and delicious\n Great choice for juice or soup\n Naturally grown",
        price: 33000,
        unit: "500g",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: "Cauliflower",
        imgUrl: "https://healthyfarm.org/wp-content/uploads/2018/04/cauliflower-vegetable_master-600x600.jpg",
        description: "Naturally grown\n Refrigerated up to 7 days",
        price: 33000,
        unit: "500g of Cauliflower",
        category: new ObjectId(categories[0].id)
      }))
      products.push(new Product({
        name: "Cherry tomato",
        imgUrl: "https://healthyfarm.org/wp-content/uploads/2017/04/Anphu_cachuabi-1-e1498449886635-600x601.jpg",
        description: "Fresh and delicious for your salad or to serve with meat dish\n Yellow, red, chocolate\n Refrigerated up to 7 days\n USDA organic certificate",
        price: 20000,
        unit: "300g of cherry tomato",
        category: new ObjectId(categories[0].id)
      }))

      // with category: dairy & eggs
      products.push(new Product({
        name: 'Azzan chocolate 100%',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'Flavor is bittersweet with a hint of sour from naturally fermented cocoa\n Ingredients: cacao, cocoa butter',
        price: 110000,
        unit: "1 package of Dark chocolate 100% from Azzan",
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'Azzan Cocoa Nibs',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/Cacao-Nips.jpg',
        description: 'Can be eaten directly or used in drinks or baked goods\n High nutritional value, suitable for vegetarians',
        price: 105000,
        unit: "250g of roasted cocoa beans Azzan",
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'Azzan cocoa powder',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/Bot-cacao.jpg',
        description: 'From the freshest and most productive cocoa beans of the Dak Lak region with a separate process of fermentation, butter skimming and roasting.\n Pure cocoa powder, do not mix any ingredients, do not add sugar, sweeteners, additives or preservatives harmful to health.',
        price: 110000,
        unit: "250g cocoa powder from Azzan",
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'Azzan coconut chocolate',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/scltrang.jpg',
        description: 'Rich, sweet, and slightly savory flavor\n Cocoa butter, organic coconut milk powder, sugar.',
        price: 110000,
        unit: "1 package of Coconut chocolate from Azzan",
        category: new ObjectId(categories[1].id)
      }))
      products.push(new Product({
        name: 'Big Bear chocolate peanut butter',
        imgUrl: 'https://healthyfarm.org/wp-content/uploads/2017/04/FullSizeRender-2-450x300.jpg',
        description: 'Great on fresh bread, an Elvis sandwich, in a smoothie, or with fruit.\n Made from freshly roasted peanuts with a touch of Dak Lak honey with absolutely no sugar or additional sweeteners. Added just a pinch of salt and a minimum of peanut oil.Fresh flavors of the peanuts and the roast come through in this spread.',
        price: 132000,
        unit: "350g of chocolate peanut butter from Big Bear Kitchen",
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
 


