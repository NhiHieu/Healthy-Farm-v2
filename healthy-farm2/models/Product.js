const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
    SellerId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Description:{
        type: String,
    },
    CategoryId:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    Name:{
        type: String,
        maxlength: 50,
    },
    Price:{
        type: Number
    },
    Unit:{
        type: Number
    },
    ImgId:[{
        type: Schema.Types.ObjectId,
        href: 'Image'
    }],
    Amount:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Product', ProductSchema)