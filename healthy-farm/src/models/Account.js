const mongoose = require('mongoose')
const { Schema } = mongoose;

const AccountSchema = new Schema({
    Email:{
        type: String,
        required: true,
        trim: true
    },
    Password:{
        type: String,
        required: true,
        trim: true
    },
    RoleId:{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

module.exports = mongoose.model('Account', AccountSchema)