const mongoose = require('mongoose')
const { Schema } = mongoose

const CartSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    OrderId:[{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    DeliveryId:{
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    },
    PaymentMethodId:{
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod'
    },
    Date:{
        type: Date,
        default: new Date.now()
    },
    Status:{
        type: String,
    },
    Total:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Cart', CartSchema)