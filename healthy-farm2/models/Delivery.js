const mongoose = require('mongoose')
const { Schema } = mongoose

const DeliverySchema = new Schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    PostCode:{
        type: Number,
    },
    Phone:{
        type: Number,
        maxlength: 12
    },
    Email:{
        type: String,
        maxlength: 50
    }
})

module.exports = mongoose.model('Delivery', DeliverySchema)