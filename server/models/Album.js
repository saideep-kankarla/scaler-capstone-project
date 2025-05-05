// models/User.js
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // format: "mm:ss"
    required: true,
  },
  singerName: {
    type: String,
    required: true,
  },
  mp3Path: {
    type: String,
    required: true,
  },
});

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      required: true,
      default: 'Telugu',
    },
    composer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 10,
    },
    poster: {
      type: String,
      required: true,
    },
    songs: [songSchema],
    premium: {
      type: Boolean,
      default: 'false',
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model('Albums', albumSchema);

module.exports = Album;
