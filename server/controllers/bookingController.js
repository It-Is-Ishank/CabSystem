const Cab = require('../models/cab');
const Booking = require('../models/cabBooking');

const bookCab = async (req, res) => {
  const { email, cabType, src, dest, startTime, endTime } = req.body;

  try {
    // Find the cab by type
    const cab = await Cab.findOne({ type: cabType });
    if (!cab) {
      return res.status(404).json({ message: 'Cab type not found' });
    }

    // Check if the cab is available for the specified time slot
    const conflictingBooking = await Booking.findOne({
        cabType: cabType,
        $or: [
          { startTime: { $gte: startTime, $lt: endTime } },  // New booking starts between existing booking
          { endTime: { $gt: startTime, $lte: endTime } },   // New booking ends between existing booking
          { startTime: { $lte: startTime }, endTime: { $gte: endTime } }, // New booking fully contained within existing booking
          { startTime: { $lt: startTime }, endTime: { $gt: endTime } } // New booking partially overlaps existing booking
        ]
      });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Cab is already booked for the specified time slot' });
    }

    // Create a new booking
    const booking = new Booking({ email, cabType, src, dest, startTime, endTime });
    await booking.save();

    // Add booking reference to cab
    cab.bookings.push(booking._id);
    await cab.save();

    return res.status(201).json({ message: 'Cab booked successfully', booking });
  } catch (error) {
    return res.status(500).json({ message: 'Error booking cab', error: error.message });
  }
};

module.exports = { bookCab };
