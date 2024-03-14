// routes/cabRoutes.js
const express = require('express');
const router = express.Router();
const cabController = require('../controllers/cabController');

// Route to check if a cab is available
router.get('/check-availability/:cabType', cabController.isCabAvailable);

// Route to book a cab
router.post('/book/:cabType', cabController.bookCab);

module.exports = router;
