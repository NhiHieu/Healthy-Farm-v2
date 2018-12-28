const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartUserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cart: {
    type: Object,
    default: {},
  }
})

module.exports = mongoose.model("CartUser", cartUserSchema);