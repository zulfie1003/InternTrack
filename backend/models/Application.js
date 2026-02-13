const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  jobType: {
    type: String,
    enum: ['internship', 'full-time', 'part-time', 'contract', 'freelance'],
    default: 'internship'
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn'],
    default: 'applied',
    index: true
  },
  salary: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  applicationDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  interviewDate: {
    type: Date
  },
  deadline: {
    type: Date
  },
  contactPerson: {
    name: String,
    email: String,
    phone: String
  },
  jobUrl: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['linkedin', 'indeed', 'company-website', 'referral', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  timeline: [{
    event: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String
  }]
}, {
  timestamps: true
});

// Compound indexes for common queries
applicationSchema.index({ user: 1, status: 1 });
applicationSchema.index({ user: 1, applicationDate: -1 });
applicationSchema.index({ user: 1, createdAt: -1 });

// Virtual for days since application
applicationSchema.virtual('daysSinceApplication').get(function() {
  return Math.floor((Date.now() - this.applicationDate) / (1000 * 60 * 60 * 24));
});

// Auto-populate user on queries
applicationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
