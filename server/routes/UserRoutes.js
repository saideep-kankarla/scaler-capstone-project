const router = require('express').Router();
const {
  login,
  register,
  getAllUsers,
  deleteUser,
  updatePremiumSubscription,
} = require('../controllers/UserController');

const verifyToken = require('../middlewares/verifyJwt');

//Get routes
router.get('/', (req, res) => {
  res.send('Welcome to user get call!');
});
router.get('/allUsers', verifyToken, getAllUsers);

//Post routes
router.post('/login', login);
router.post('/register', register);

router.patch('/premium-subscribe', verifyToken, updatePremiumSubscription);

router.delete('/deleteUser/:userId', verifyToken, deleteUser);

module.exports = router;
