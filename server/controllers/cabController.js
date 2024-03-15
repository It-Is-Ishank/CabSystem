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


