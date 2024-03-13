const mongoose = require('mongoose');

const cabBookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
//  cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', cabBookingSchema);
