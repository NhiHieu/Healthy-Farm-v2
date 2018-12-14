const mongoose = require('mongoose')
const { Schema } = mongoose

const PaymentMethodSchema = new Schema({
    Method:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema)
