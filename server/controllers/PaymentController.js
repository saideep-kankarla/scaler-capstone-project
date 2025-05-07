// controllers/AuthController.js
// const User = require('../models/User');

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

module.exports = { paymentIntent, confirmPayment, retrievePayment };
