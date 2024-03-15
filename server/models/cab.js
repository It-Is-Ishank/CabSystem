const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema({
  type: { type: String, required: true },
  ppm : {type : Number,required :true},
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model("Cab", cabSchema);
