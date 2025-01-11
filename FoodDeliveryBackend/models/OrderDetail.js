// models/OrderDetail.js
const mongoose = require('mongoose');

const orderDetailItemSchema = new mongoose.Schema({
    itemId: {
      type: mongoose.Schema.Types.Mixed, // Use ObjectId here
      ref: 'Menu', // Reference to the Menu model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  });
  

const orderDetailSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  items: [orderDetailItemSchema],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true, // Date of the order
  },
  estimatedDelivery: {
    type: String,
    required: true, // Estimated delivery time
  },
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;