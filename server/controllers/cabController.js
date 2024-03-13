// controllers/cabController.js

// Array to store information about cabs
const cabs = [
    { id: 1, type: 'se', isBooked: false },
    { id: 2, type: 'go', isBooked: false },
    { id: 3, type: 'premium', isBooked: false },
    { id: 4, type: 'xl', isBooked: false },
    { id: 5, type: 'black', isBooked: false },
  ];
  
  // Function to check if a cab is available
  exports.isCabAvailable = (req, res) => {
    const cabId = parseInt(req.params.cabId);
    const cab = cabs.find(cab => cab.id === cabId);
    if (cab && !cab.isBooked) {
      res.status(200).json({ available: true });
    } else {
      res.status(200).json({ available: false });
    }
  };
  
  // Function to book a cab
  const bookCab = (cabId) => {
    const cab = cabs.find(cab => cab.id === cabId);
    if (cab && !cab.isBooked) {
      cab.isBooked = true;
      return true; // Booking successful
    }
    return false; // Cab not available or not found
  };
  
  module.exports = { isCabAvailable, bookCab };
  