const Cab = require('../models/cab');

exports.addCab = async (req, res) => {
  const { type,ppm } = req.body;

  try {
    // Check if a cab with the same type already exists
    const existingCab = await Cab.findOne({ type });

    if (existingCab) {
      return res.status(400).json({ message: 'Cab of this type already exists' });
    }

    // Create a new cab
    const newCab = new Cab({ type,ppm });
    await newCab.save();

    return res.status(201).json(newCab);
  } catch (error) {
    return res.status(500).json({ message: 'Could not add cab', error: error.message });
  }
};


