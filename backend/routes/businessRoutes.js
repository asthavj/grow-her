// routes/businessRoutes.js
const express = require('express');
const { registerBusiness, getBusinessProfile } = require('../controllers/businessController');
const { protect } = require('../middleware/auth');
const businessDocsUpload = require('../middleware/BusinessDocsUpload');

const router = express.Router();

// Register business with file uploads
router.post('/register/business', businessDocsUpload, registerBusiness);

// Get business profile (protected route)
router.get('/profile', protect, getBusinessProfile);

module.exports = router;
