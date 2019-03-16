const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  name:{
    type: String,
    maxlength: 50,
    required: true
  },
  imgUrl:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  unit:{
    type: String,
    required: true
  },
  sellerId:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Amount:{
    type: Number,
    default: 0
  },
  ImgId:[{
    type: Schema.Types.ObjectId,
    href: 'Image'
  }],
})

module.exports = mongoose.model('Product', productSchema);