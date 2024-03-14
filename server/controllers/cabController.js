// controllers/cabController.js
const Cab = require('../models/cab');
const CabBooking = require('../models/cabBooking');

// Function to book a cab
exports.bookCab = async (req, res) => {
  try {
    const { cabType, email, startTime, endTime } = req.body;

    // Find the cab
    const cab = await Cab.findOne({ cabType }).populate('bookings');

    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }

    // Check if the cab is already booked during the specified time slot
    const overlappingBooking = cab.bookings.find(booking =>
      (booking.startTime <= endTime && booking.endTime >= startTime)
    );

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Cab is already booked for the specified time slot' });
    }

    // Create a new cab booking
    const booking = new CabBooking({
      cabType,
      email,
      source: req.body.source,
      destination: req.body.destination,
      startTime,
      endTime
    });

    // Save the booking
    await booking.save();

    // Update the cab's bookings array
    cab.bookings.push(booking);
    await cab.save();

    res.status(200).json({ message: 'Cab booked successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllCabs = async (req,res) => {
  try{
    const cabs = await Cab.find();
    res.status(200).json(cabs);
  }catch (err)  {
    console.log(err);
    res.status(500).json({error : "Internal server error"});
  }
}

exports.editCab = async (req, res) => {
  try {
    const cabType = req.params.type;
    const data = req.body;
    console.log(data)

    // Find the cab with the specified type
    const cab = await Cab.findOne({ type: cabType });

    if (!cab) {
      return res.status(404).json({ message: "No such type of cab exists." });
    }

    // Update cab properties
    cab.type = data.type;
    cab.ppm = data.ppm;

    // Save the updated cab
    await cab.save();

    res.status(200).json({
      message: "Cab updated Successfully",
      acknowledges: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addCab = async (req,res) => {
  try {
    const { cabType, ppm} = req.body
    let newCab = new Cab ({
      type: cabType,
      ppm: ppm
    });
    await newCab.save()
    res.status(201).send(newCab)
  } catch (err) {
    console.log(err);
    res.status(500).json({error : 'Server Error'});
  }
}
