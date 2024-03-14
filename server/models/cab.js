const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  type: { type: String, required: true, unique : true },
  ppm : {type: Number,required:true},
  isBooked: { type: Boolean, default: false },
  bookings: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    default: []
  }
});

module.exports = mongoose.model('Cab', cabSchema);