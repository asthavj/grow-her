const User = require('../models/User');
const fs = require('fs');

// @desc    Register investor
// @route   POST /api/auth/register/investor
// @access  Public
exports.registerInvestor = async (req, res) => {
  try {
    // Extract data from request
    const {
      fullName,
      email,
      phone,
      password,
      occupation,
      company,
      linkedin,
      terms
    } = req.body;

    // Validate terms agreement
    if (!terms) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the Terms & Conditions'
      });
    }

    // Generate a username from email
    const username = req.body.username || email.split('@')[0] + Math.floor(Math.random() * 1000);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Get file path if uploaded
    let governmentId = null;
    if (req.file) {
      // Store the relative path, not the absolute path
      governmentId = req.file.path.replace(/\\/g, '/');
    } else {
      return res.status(400).json({
        success: false,
        message: 'Government ID is required'
      });
    }

    // Create user
    const user = await User.create({
      username,
      fullName,
      email,
      phone,
      password,
      role: 'investor',
      occupation,
      company: company || undefined,
      linkedin: linkedin || undefined,
      governmentId: req.file ? req.file.path : null
    });

    // Generate token
    const token = user.getSignedJwtToken();

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'Investor registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Investor registration error:', error);
    // If there was a file upload, remove it on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error removing file:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Get investor profile
// @route   GET /api/investors/profile
// @access  Private
exports.getInvestorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.role !== 'investor') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. This endpoint is for investors only.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching investor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
