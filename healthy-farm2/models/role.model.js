const mongoose = require('mongoose')
const { Schema } = mongoose

const roleSchema = new Schema({
  key:{
      type: String,
      maxlength: 20,
  }
})

module.exports = mongoose.model('Role', roleSchema)