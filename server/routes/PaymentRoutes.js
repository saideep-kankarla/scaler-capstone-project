const router = require('express').Router();
const verifyToken = require('../middlewares/verifyJwt');

const {
  paymentIntent,
  confirmPayment,
  retrievePayment,
  getAllPayments,
  getPaymentById,
  createPayment,
} = require('../controllers/PaymentController');

router.post('/create-payment-intent', verifyToken, paymentIntent);
router.post('/confirm-payment', verifyToken, confirmPayment);
router.post('/retrieve-payment-status', verifyToken, retrievePayment);

router.post('/create', verifyToken, createPayment);

router.get('/getAllPayments', verifyToken, getAllPayments);
router.get('/getPaymentById/:id', verifyToken, getPaymentById);

module.exports = router;
