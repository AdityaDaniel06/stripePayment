const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    paymentType: String,
    transactionId: String,
    paymentStatus: String,
    totalAmount: Number,
    items: Array,
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", orderSchema);