const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = new Schema({
    Src:{
        type: String,
        required: true
    },
    Alt:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Image', ImageSchema)