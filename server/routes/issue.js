const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const {
  getAllIssuesStudent,
  getSpecficIssue,
  updateIssueToReturned,
  getAllIssues,
  createNewIssue,
  deleteAllIssues,
} = require('../controllers/issueController');

const router = express.Router();

// Normal user
router.get('/student', requireAuth, getAllIssuesStudent);
router.get('/student/:issueId', requireAuth, getSpecficIssue);

// Admin
router.put('/:issueId', requireAuth, requireAdmin, updateIssueToReturned);
router.get('/', requireAuth, requireAdmin, getAllIssues);
router.post('/', requireAuth, requireAdmin, createNewIssue);
router.delete('/', requireAuth, requireAdmin, deleteAllIssues);

module.exports = router;
