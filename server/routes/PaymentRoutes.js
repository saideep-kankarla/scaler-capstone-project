const router = require('express').Router();
const {
  paymentIntent,
  confirmPayment,
} = require('../controllers/PaymentController');

router.post('/create-payment-intent', paymentIntent);
router.post('/confirm-payment', confirmPayment);

module.exports = router;
