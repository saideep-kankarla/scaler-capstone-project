const router = require('express').Router();
const { login, register } = require('../controllers/UserController');

//Get routes
router.get('/', (req, res) => {
  res.send('Welcome to user get call!');
});

//Post routes
router.post('/login', login);
router.post('/register', register);

module.exports = router;
