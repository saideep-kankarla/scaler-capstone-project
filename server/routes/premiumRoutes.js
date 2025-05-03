// routes/protected.js
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyJwt');

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Hello, authenticated user!' });
});

module.exports = router;
