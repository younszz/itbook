const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },
  shippingAddress: String,
  totalAmount: Number,
  receiver: {
    name: String,
    phone: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);
