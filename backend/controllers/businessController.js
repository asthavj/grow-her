// controllers/businessController.js
const User = require('../models/User');
const fs = require('fs');

// @desc    Register business
// @route   POST /api/auth/register/business
// @access  Public
exports.registerBusiness = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('File:', req.file);
    // Extract data from request
    const {
      businessName,
      ownerName,
      email,
      phone,
      password,
      industry,
      businessType,
      description,
      website,
      fundingGoal,
      investmentType,
      businessStage,
      terms
    } = req.body;

    // Validate terms agreement
    if (terms !== 'true') {
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
      // Remove uploaded files if user exists
      if (req.files) {
        Object.keys(req.files).forEach(key => {
          req.files[key].forEach(file => {
            fs.unlink(file.path, err => {
              if (err) console.error(`Error removing file: ${file.path}`, err);
            });
          });
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Get file paths if uploaded
    let registrationCertificate = null;
    let governmentId = null;
    
    if (req.files && req.files.registrationCertificate && req.files.registrationCertificate.length > 0) {
      registrationCertificate = req.files.registrationCertificate[0].path;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Business Registration Certificate is required'
      });
    }
    
    if (req.files && req.files.governmentId && req.files.governmentId.length > 0) {
      governmentId = req.files.governmentId[0].path;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Government ID is required'
      });
    }

    // Create user
      const user = await User.create({
      username,
      fullName: ownerName,
      email,
      phone,
      password,
      role: 'business',
      businessName,
      industry,
      businessType,
      description,
      website: website || undefined,
      fundingGoal,
      investmentType,
      businessStage,
      registrationCertificate,
      governmentId
    });

    // Generate token
    const token = user.getSignedJwtToken();

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'Business registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Business registration error:', error);
    
    // If there were file uploads, remove them on error
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        req.files[key].forEach(file => {
          fs.unlink(file.path, err => {
            if (err) console.error(`Error removing file: ${file.path}`, err);
          });
        });
      });
        }
        
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Get business profile
// @route   GET /api/business/profile
// @access  Private
exports.getBusinessProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.role !== 'business') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. This endpoint is for business accounts only.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
