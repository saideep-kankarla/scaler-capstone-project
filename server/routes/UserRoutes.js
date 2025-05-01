const router = require('express').Router();
const { register } = require('../controllers/UserController');

//Get routes
router.get('/', (req, res, next) => {
  res.send('Welcome to user get call!');
});

//Post routes
// routes/auth.js

router.post('/register', register);

module.exports = router;
