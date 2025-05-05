// models/User.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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

const Album = mongoose.model('Albums', albumSchema);

module.exports = albumSchema;
