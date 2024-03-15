const mongoose = require('mongoose');

const cabBookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  cabType: { type: String, required: true },
  cost : {type : Number ,required:true},
  tripTime:{type : String,required : true},
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', cabBookingSchema);
