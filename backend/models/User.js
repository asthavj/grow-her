const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  fullName: {
    type: String,
    required: [true, 'Please provide your full name']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  role: {
    type: String,
    enum: ['investor', 'business'],
    default: 'investor'
  },
  
  // Investor specific fields
  occupation: {
    type: String,
    enum: ['Self-employed', 'Corporate', 'Retired', 'Other'],
    required: function() { return this.role === 'investor'; }
  },
  company: {
    type: String
  },
  linkedin: {
    type: String
  },
  governmentId: {
    type: String,
    required: function() { return this.role === 'investor'; }
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

// Business specific fields
  businessName: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  industry: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  businessType: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  description: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  website: {
    type: String
  },
  fundingGoal: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  investmentType: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  businessStage: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  registrationCertificate: {
    type: String,
    required: function() { return this.role === 'business'; }
  },
  governmentId: {
    type: String,
    required: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  });

  // Encrypt password using bcrypt
  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Generate username from email if not provided
UserSchema.pre('save', function(next) {
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0] + Math.floor(Math.random() * 1000);
  }
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
