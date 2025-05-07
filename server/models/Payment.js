const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    stripePaymentId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['succeeded', 'pending', 'failed'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payments', paymentSchema);

module.exports = Payment;
