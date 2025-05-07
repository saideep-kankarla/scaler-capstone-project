const Payment = require('../models/Payment');

// This is your test secret API key.
const stripe = require('stripe')(
  'sk_test_51RLqmkCp3ZflPRdBmpBaT9TUJ5R6vDZyVTzsY0AFWOkrwMguxfCtadsbBASIxxglnPtx6a0CiXjjGWxz2ng9Zc9R00izsoDXuD'
);

// Endpoint to create a payment intent
const paymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to confirm payment and update user
const confirmPayment = async (req, res) => {
  const { userId, paymentIntentId } = req.body;

  try {
    // Retrieve the payment intent to confirm its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update user as premium
      await User.findByIdAndUpdate(userId, { premiumUser: true });
      res.send({
        success: true,
        message: 'Payment successful and user updated.',
      });
    } else {
      res
        .status(400)
        .send({ success: false, message: 'Payment not successful.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const retrievePayment = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve payment status' });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().exec();
    res.status(200).json({ status: 200, message: 'Success', payments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId).exec();
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).json({ status: 200, message: 'Success', payment });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res
      .status(201)
      .json({ status: 201, message: 'Payment Created Successfully', payment });
  } catch (error) {
    res.status(400).json({ message: 'Error creating payment', error });
  }
};

module.exports = {
  paymentIntent,
  confirmPayment,
  retrievePayment,
  getAllPayments,
  getPaymentById,
  createPayment,
};
