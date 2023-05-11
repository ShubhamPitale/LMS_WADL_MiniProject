const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '----Not available----',
  },
  category: {
    type: String,
    enum: [
      'Romance',
      'Technology',
      'Computer Science',
      'Management',
      'Electronics',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Fiction',
      'Philosophy',
      'Language',
      'Arts',
      'Other',
    ],
    required: true,
  },
  copies: {
    type: Number,
    min: 1,
    max: 1000,
    required: true,
  },
  shelf: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  floor: {
    type: Number,
    min: 0,
    max: 8,
  },
});

module.exports = mongoose.model('Book', bookSchema);
