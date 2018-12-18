const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email:{
    type: String,
    trim: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String
  },
  nameDisplay:{
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
  Role:{
    type: Schema.Types.ObjectId, ref: 'Role'
  }
})


module.exports = mongoose.model('User', UserSchema)