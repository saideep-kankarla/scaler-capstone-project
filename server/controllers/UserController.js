// controllers/AuthController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: 'user',
      premiumSubscribed: false,
    });

    // Save user to database
    await user.save();

    res.status(201).json({ status: 201, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
const login = async (req, res) => {
  try {
    console.log('Login Attempt..');

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[Login] Invalid credentials..');
      return res
        .status(401)
        .json({ status: 401, message: 'Invalid credentials' });
    }

    // Check if password is correct
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      console.log('[Login] Invalid Password..');

      return res
        .status(401)
        .json({ status: 401, error: 'Login with proper credentials!' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    console.log('[Login] Authenticated with JWT..');

    res.json({
      status: 200,
      success: 'Authenticated Successfully!',
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        createdAt: user.createdAt,
        premiumSubscribed: user.premiumSubscribed,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { register, login };
