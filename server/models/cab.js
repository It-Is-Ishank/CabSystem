const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  type: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Cab', cabSchema);