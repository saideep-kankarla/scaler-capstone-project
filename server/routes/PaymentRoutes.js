const router = require('express').Router();
const {
  paymentIntent,
  confirmPayment,
  retrievePayment,
} = require('../controllers/PaymentController');

router.post('/create-payment-intent', paymentIntent);
router.post('/confirm-payment', confirmPayment);
router.post('/retrieve-payment-status', retrievePayment);

module.exports = router;
