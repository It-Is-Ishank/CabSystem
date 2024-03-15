const moment = require('moment-timezone');
const Cab = require('../models/cab');
const CabBooking = require('../models/cabBooking');
const cab = require('../models/cab');

const isConflicting = async (bookingId, nst, net) => {
    try {
        const booking = await CabBooking.findById(bookingId);
        if (!booking) {
            console.log("Booking not found for ID:", bookingId);
            return false;
        }

        const startTime = moment(booking.startTime, 'YYYY-MM-DDTHH:mm');
        const endTime = moment(booking.endTime, 'YYYY-MM-DDTHH:mm');

       

        if ((nst.isAfter(endTime) && net.isAfter(endTime)) || (nst.isBefore(startTime) && net.isBefore(startTime))) {
            console.log("No conflict detected");
            return false;
        }
        console.log("Conflict detected");
        return true;
    } catch (error) {
        console.error("Error checking conflicting booking:", error);
        throw error; // Rethrow the error to be handled in the calling function if needed
    }
};

exports.availableCabs = async (req, res) => {
    const { startTime , endTime } = req.body;
    try {
       
        const cabs = await Cab.find();

        if (!cabs || cabs.length === 0) {
            console.log("No cabs found");
            return res.status(500).send("No cabs found");
        }

        const availableCabs = [];
        for (const cab of cabs) {
            let isAvailable = true;

    
            // Check for conflicting bookings
            for (const bookingId of cab.bookings) {
                if (await isConflicting(bookingId, moment(startTime, 'YYYY-MM-DDTHH:mm'), moment(endTime, 'YYYY-MM-DDTHH:mm'))) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) {
                availableCabs.push(cab);
            }
        }

        // Send the list of available cabs
        return res.status(200).json(availableCabs);
    } catch (err) {
        console.error("Error in availableCabs function:", err);
        return res.status(500).json({error : err});
    }
}

exports.bookCab = async (req, res) => {
    const { cabType, startTime, minTime, email, source, destination } = req.body;
    
    // Parse startTime in Indian Standard Time (IST)
    const startTimeIST = moment.tz(startTime, 'YYYY-MM-DDTHH:mm', 'Asia/Kolkata');
    // Add minTime to startTime to calculate endTime
    const endTimeIST = startTimeIST.clone().add(minTime, 'minutes');

    

    // Find cabs of the specified type
    const cab = await Cab.findOne({ type: cabType });
    if (!cab) {
        return res.status(404).send("No cabs found of type " + cabType);
    }

    // Check for conflicting bookings
    const conflictingBooking = cab.bookings.find((b) => isConflicting(b, startTimeIST, endTimeIST));
    if (conflictingBooking) {
        return res.status(409).send("Conflicting booking");
    }
    
    // Create a new booking
    const newBooking = new CabBooking({
        cabType,
        startTime: startTimeIST.toISOString(), // Convert startTime to UTC string format
        endTime: endTimeIST.toISOString(), // Convert endTime to UTC string format
        email,
        source,
        destination
    });

    console.log("New Booking:", newBooking);

    // Save the new booking
    try {
        const savedBooking = await newBooking.save();
        cab.bookings.push(savedBooking._id);
        await cab.save();
        return res.status(201).send("Booking created successfully");
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).send("Failed to create booking");
    }
}

