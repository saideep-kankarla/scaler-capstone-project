const router = require('express').Router();
const {
  paymentIntent,
  confirmPayment,
  retrievePayment,
  getAllPayments,
  getPaymentById,
  createPayment,
} = require('../controllers/PaymentController');

router.post('/create-payment-intent', paymentIntent);
router.post('/confirm-payment', confirmPayment);
router.post('/retrieve-payment-status', retrievePayment);

router.get('/getAllPayments', getAllPayments);
router.get('/getPaymentById/:id', getPaymentById);
router.post('/create', createPayment);

module.exports = router;
