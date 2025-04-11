const express = require('express');
const { registerInvestor, getInvestorProfile } = require('../controllers/investorController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/GovtIdUpload');

const router = express.Router();

// Register investor with file upload
router.post('/register/investor', upload.single('governmentId'), registerInvestor);

// Get investor profile (protected route)
router.get('/profile', protect, getInvestorProfile);

module.exports = router;
