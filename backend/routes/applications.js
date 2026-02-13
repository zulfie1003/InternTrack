const express = require('express');
const router = express.Router();
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  updateStatus,
  bulkDelete
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Bulk operations
router.delete('/bulk', bulkDelete);

// Status update
router.patch('/:id/status', updateStatus);

// CRUD operations
router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

module.exports = router;
