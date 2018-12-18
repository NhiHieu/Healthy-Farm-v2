const mongoose = require('mongoose')
const { Schema } = mongoose

RoleSchema = new Schema({
    Key:{
        type: String,
        maxlength: 20,
    }
})

module.exports = mongoose.model('Role', RoleSchema)