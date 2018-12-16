const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    FirstName:{
        type: String,
    },
    LastName:{
        type: String
    },
    NameDisplay:{
        type: String,
        required: true,
        maxlength: 50
    },
    PhoneNumber:{
        type: Number,
        maxlength: 12,
        trim: true
    },
    Address1:{
        type: String,
        required: true,
        maxlength: 200
    },
    Address2:{
        type: String,
        maxlength: 200
    },
    Birth:{
        type: Date,
        required: true
    },
    Email:{
        type: String,
        trim: true,
        maxlength: 50
    },
    AccountId:{
        type: Schema.Types.ObjectId, ref: 'Account'
    }
})

module.exports = mongoose.model('User', UserSchema)