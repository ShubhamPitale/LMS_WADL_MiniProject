const express = require('express');
const {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
} = require('../controllers/bookController');

const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

// Normal User
router.get('/', requireAuth, getAllBooks);
router.get('/:bookId', requireAuth, getBook);

// Admin
router.post('/', requireAuth, requireAdmin, createBook);
router.put('/:bookId', requireAuth, requireAdmin, updateBook);
router.delete('/:bookId', requireAuth, requireAdmin, deleteBook);

module.exports = router;
