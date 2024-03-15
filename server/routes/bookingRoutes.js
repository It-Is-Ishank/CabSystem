const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController')

router.get("/getBooking/:id", bookingController.getBooking);
router.post('/available-cabs', bookingController.availableCabs);
router.post('/book-cab',bookingController.bookCab);
router.get('/get-all-bookings', bookingController.getAllBookings);
router.delete('/delete-booking/:id', bookingController.deleteBooking);

module.exports = router;