const moment = require("moment-timezone");
const Cab = require("../models/cab");
const CabBooking = require("../models/cabBooking");
const {
  sendBookingConfirmationEmail,
  sendCancellationEmail,
} = require("../utils/nodemailer-config"); // Adjust the path to the email service file accordingly

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  try {
    // Find the booking by ID
    const booking = await CabBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    // Find the corresponding cab and remove the booking ID from its bookings array
    const cab = await Cab.findOne({ type: booking.cabType });
    if (cab) {
      cab.bookings.pull(bookingId);
      await cab.save();
    } else {
      return res.status(404).send("Corresponding cab not found");
    }

    // Delete the booking
    await CabBooking.findByIdAndDelete(bookingId);

    // Send cancellation email to the customer
    if (status == "Pending") {
      await sendCancellationEmail({
        startTime: booking.startTime,
        source: booking.source,
        destination: booking.destination,
        email: booking.email,
      });
    }

    return res.status(200).send("Booking deleted successfully");
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).send("Failed to delete booking");
  }
};
// Function to check for conflicts
const isConflicting = async (cab, startTime, endTime) => {
  try {
    // Loop through existing bookings
    for (const bookingId of cab.bookings) {
      const booking = await CabBooking.findById(bookingId);
      if (!booking) {
        return false;
      }

      const bookingStartTime = moment.utc(booking.startTime);
      const bookingEndTime = moment.utc(booking.endTime);

      // Log details of comparison
      console.log("Booking Start Time:", bookingStartTime.format());
      console.log("Booking End Time:", bookingEndTime.format());
      console.log("Input Start Time:", startTime.format());
      console.log("Input End Time:", endTime.format());

      // Check for conflicts
      if (
        !(
          startTime.isBefore(bookingStartTime) &&
          endTime.isBefore(bookingStartTime)
        ) &&
        !(startTime.isAfter(bookingEndTime) && endTime.isAfter(bookingEndTime))
      ) {
        console.log("Conflict detected");
        return true;
      }
    }
    console.log("No conflicts found");
    return false; // No conflicts found
  } catch (error) {
    console.error("Error checking conflicting booking:", error);
    throw error;
  }
};

exports.availableCabs = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    // Parse start and end times in the appropriate time zone
    const startTimeMoment = moment(startTime).utc();
    const endTimeMoment = moment(endTime).utc();

    // Find all cabs
    const cabs = await Cab.find();

    if (!cabs || cabs.length === 0) {
      console.log("No cabs found");
      return res.status(500).send("No cabs found");
    }

    // Filter available cabs based on conflicting bookings
    const availableCabs = [];
    for (const cab of cabs) {
      const conflicting = await isConflicting(
        cab,
        startTimeMoment,
        endTimeMoment
      );
      if (!conflicting) {
        availableCabs.push(cab);
      }
    }

    // Send the list of available cabs
    return res.status(200).json(availableCabs);
  } catch (err) {
    console.error("Error in availableCabs function:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await CabBooking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await CabBooking.findById(bookingId);
    if (!booking) {
      res.status(404).send("The Booking was not found");
      return;
    } else {
      console.log(
        moment.tz(booking.startTime, "YYYY-MM-DDTHH:mm", "Asia/Kolkata"),
        booking.endTime
      );
      res.status(200).json(booking);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

exports.bookCab = async (req, res) => {
  const { cabType, startTime, minTime, email, source, destination } = req.body;

  try {
    // Parse start time and calculate end time
    const startTimeMoment = moment(startTime);
    const endTimeMoment = startTimeMoment.clone().add(minTime, "minutes");

    // Find cab of the specified type
    const cab = await Cab.findOne({ type: cabType });
    if (!cab) {
      return res.status(404).send("No cabs found of type " + cabType);
    }

    // Check for conflicting bookings
    const isConflict = await isConflicting(cab, startTimeMoment, endTimeMoment);
    if (isConflict) {
      return res.status(409).send("Conflicting booking");
    }

    // Create a new booking
    const newBooking = new CabBooking({
      cabType,
      startTime: startTimeMoment.toDate(),
      endTime: endTimeMoment.toDate(),
      email,
      cost: cab.ppm * minTime,
      source,
      destination,
      tripTime: minTime,
    });

    // Save the new booking
    await newBooking.save();
    cab.bookings.push(newBooking._id);
    await cab.save();

    // Send booking confirmation email to the customer
    await sendBookingConfirmationEmail({
      startTime: startTime,
      source: source,
      destination: destination,
      email: email,
    });

    return res.status(201).send("Booking created successfully");
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).send("Failed to create booking");
  }
};
