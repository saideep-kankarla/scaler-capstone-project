// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    premiumSubscribed: {
      type: Boolean,
      default: 'false',
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
