const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email:{
    type: String,
    trim: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true
  },
  addressDelivery: [{
    name: String,
    address: {
      type: String,
      maxlength: 200
    },
    phoneNumber: {
      type: Number,
      maxlength: 12
    }
  }],
  firstName:{
    type: String,
  },
  lastName:{
    type: String
  },
  username:{
    type: String,
    required: true,
    maxlength: 20
  },
  PhoneNumber:{
    type: Number,
    maxlength: 12,
    trim: true
  },
  Address1:{
    type: String,
    maxlength: 200
  },
  Address2:{
    type: String,
    maxlength: 200
  },
  Birth:{
    type: Date,
  },
  Role:{
    type: Schema.Types.ObjectId, ref: 'Role'
  }
})

userSchema.methods.hashPassword = (password) =>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema)