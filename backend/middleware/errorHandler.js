const fs = require('fs');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Remove uploaded file if there's an error
  if (req.file) {
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) console.error('Error removing file:', unlinkErr);
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
