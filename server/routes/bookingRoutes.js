const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController')

router.post('/available-cabs', bookingController.availableCabs);
router.post('/book-cab',bookingController.bookCab);

module.exports = router;