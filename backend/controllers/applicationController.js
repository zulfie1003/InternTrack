const Application = require('../models/Application');
const { asyncHandler } = require('../middleware/error');

// @desc    Get all applications for logged in user
// @route   GET /api/applications
// @access  Private
exports.getApplications = asyncHandler(async (req, res) => {
  const { status, jobType, priority, search, sort, page = 1, limit = 10 } = req.query;

  // Build query
  const query = { user: req.user.id };

  // Filters
  if (status) query.status = status;
  if (jobType) query.jobType = jobType;
  if (priority) query.priority = priority;

  // Search
  if (search) {
    query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } }
    ];
  }

  // Sort
  let sortBy = '-createdAt';
  if (sort === 'company') sortBy = 'company';
  if (sort === '-company') sortBy = '-company';
  if (sort === 'position') sortBy = 'position';
  if (sort === 'applicationDate') sortBy = '-applicationDate';
  if (sort === 'status') sortBy = 'status';

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const applications = await Application.find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limitNum)
    .populate('user', 'name email');

  // Get total count
  const total = await Application.countDocuments(query);

  res.status(200).json({
    success: true,
    count: applications.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    applications
  });
});

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  // Make sure user owns application
  if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this application'
    });
  }

  res.status(200).json({
    success: true,
    application
  });
});

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
exports.createApplication = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const application = await Application.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Application created successfully',
    application
  });
});

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
exports.updateApplication = asyncHandler(async (req, res) => {
  let application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  // Make sure user owns application
  if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this application'
    });
  }

  // If status is being updated, add to timeline
  if (req.body.status && req.body.status !== application.status) {
    const timelineEvent = {
      event: `Status changed to ${req.body.status}`,
      date: Date.now(),
      notes: req.body.statusNotes || ''
    };
    
    if (!application.timeline) {
      application.timeline = [];
    }
    application.timeline.push(timelineEvent);
  }

  application = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Application updated successfully',
    application
  });
});

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  // Make sure user owns application
  if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this application'
    });
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully'
  });
});

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  Private
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required'
    });
  }

  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  // Make sure user owns application
  if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this application'
    });
  }

  // Add to timeline
  const timelineEvent = {
    event: `Status changed from ${application.status} to ${status}`,
    date: Date.now(),
    notes: notes || ''
  };

  application.status = status;
  application.timeline.push(timelineEvent);

  await application.save();

  res.status(200).json({
    success: true,
    message: 'Status updated successfully',
    application
  });
});

// @desc    Bulk delete applications
// @route   DELETE /api/applications/bulk
// @access  Private
exports.bulkDelete = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide array of application IDs'
    });
  }

  const result = await Application.deleteMany({
    _id: { $in: ids },
    user: req.user.id
  });

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} applications deleted successfully`,
    deletedCount: result.deletedCount
  });
});
