const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    CartId:{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    Quantity:{
        type: Number,
        default: 1
    },
    ProductId:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('Order', OrderSchema)