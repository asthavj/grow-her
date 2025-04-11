const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Route files
const auth = require('./routes/auth');
const investorRoutes = require('./routes/investorRoutes');
const businessRoutes = require('./routes/businessRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/auth', investorRoutes);
app.use('/api/auth', businessRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GrowHer API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Set cache control for static assets
  if (req.path.match(/\.(js|css|jpg|png|gif|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  } else if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
  }
  next();
});

