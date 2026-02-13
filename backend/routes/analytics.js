const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getStatusStats,
  getTimelineData,
  getResponseRate,
  getSourceAnalytics
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/dashboard', getDashboardAnalytics);
router.get('/status-stats', getStatusStats);
router.get('/timeline', getTimelineData);
router.get('/response-rate', getResponseRate);
router.get('/sources', getSourceAnalytics);

module.exports = router;
