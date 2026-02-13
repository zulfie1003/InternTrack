const Application = require('../models/Application');
const { asyncHandler } = require('../middleware/error');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Total applications
  const totalApplications = await Application.countDocuments({ user: userId });

  // Applications by status
  const statusBreakdown = await Application.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Applications by job type
  const jobTypeBreakdown = await Application.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$jobType', count: { $sum: 1 } } }
  ]);

  // Monthly applications (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyApplications = await Application.aggregate([
    {
      $match: {
        user: userId,
        applicationDate: { $gte: sixMonthsAgo }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$applicationDate' },
          month: { $month: '$applicationDate' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Success rate (offers / total)
  const offerCount = await Application.countDocuments({
    user: userId,
    status: { $in: ['offer', 'accepted'] }
  });
  const successRate = totalApplications > 0 
    ? ((offerCount / totalApplications) * 100).toFixed(2)
    : 0;

  // Recent applications (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentCount = await Application.countDocuments({
    user: userId,
    createdAt: { $gte: sevenDaysAgo }
  });

  // Applications by priority
  const priorityBreakdown = await Application.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$priority', count: { $sum: 1 } } }
  ]);

  // Top companies applied to
  const topCompanies = await Application.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$company', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  res.status(200).json({
    success: true,
    analytics: {
      totalApplications,
      recentCount,
      successRate: parseFloat(successRate),
      offerCount,
      statusBreakdown,
      jobTypeBreakdown,
      monthlyApplications,
      priorityBreakdown,
      topCompanies
    }
  });
});

// @desc    Get status statistics
// @route   GET /api/analytics/status-stats
// @access  Private
exports.getStatusStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const stats = await Application.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgDaysSince: {
          $avg: {
            $divide: [
              { $subtract: [new Date(), '$applicationDate'] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      }
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        avgDaysSince: { $round: ['$avgDaysSince', 0] },
        _id: 0
      }
    }
  ]);

  res.status(200).json({
    success: true,
    stats
  });
});

// @desc    Get timeline data
// @route   GET /api/analytics/timeline
// @access  Private
exports.getTimelineData = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { days = 30 } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));

  const timeline = await Application.aggregate([
    {
      $match: {
        user: userId,
        applicationDate: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$applicationDate'
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        date: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);

  res.status(200).json({
    success: true,
    timeline
  });
});

// @desc    Get response rate analytics
// @route   GET /api/analytics/response-rate
// @access  Private
exports.getResponseRate = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const total = await Application.countDocuments({ user: userId });
  
  const responded = await Application.countDocuments({
    user: userId,
    status: { $in: ['interview', 'offer', 'accepted', 'rejected'] }
  });

  const noResponse = await Application.countDocuments({
    user: userId,
    status: 'applied'
  });

  const responseRate = total > 0 
    ? ((responded / total) * 100).toFixed(2)
    : 0;

  res.status(200).json({
    success: true,
    analytics: {
      total,
      responded,
      noResponse,
      responseRate: parseFloat(responseRate)
    }
  });
});

// @desc    Get source analytics
// @route   GET /api/analytics/sources
// @access  Private
exports.getSourceAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const sourceStats = await Application.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: '$source',
        count: { $sum: 1 },
        offerCount: {
          $sum: {
            $cond: [
              { $in: ['$status', ['offer', 'accepted']] },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        source: '$_id',
        count: 1,
        offerCount: 1,
        successRate: {
          $cond: [
            { $gt: ['$count', 0] },
            { $multiply: [{ $divide: ['$offerCount', '$count'] }, 100] },
            0
          ]
        },
        _id: 0
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    sourceStats
  });
});
