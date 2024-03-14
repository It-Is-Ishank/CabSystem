// const conflictingBooking = await Booking.findOne({
//     cab: cab._id,
//     $or: [
//       { startTime: { $gte: startTime, $lt: endTime } },  // New booking starts between existing booking
//       { endTime: { $gt: startTime, $lte: endTime } },   // New booking ends between existing booking
//       { startTime: { $lte: startTime }, endTime: { $gte: endTime } }, // New booking fully contained within existing booking
//       { startTime: { $lt: startTime }, endTime: { $gt: endTime } } // New booking partially is between existing booking
//     ]
//   });
const express = require("express");
const app = express();
app.use(express.json());
const moment = require('moment');
const Cab = require('../models/cab');
const CabBooking = require('../models/cabBooking');
const cabBooking = require("../models/cabBooking");

const isConflicting = async (bookingId,nst,net) => {
    const booking = cabBooking.findById(bookingId);
    const startTime = moment(booking.startTime,'YYYY-MM-DDTHH:mm');
    const endTime = moment(booking.endTime,'YYYY-MM-DDTHH:mm');

    if((nst.isAfter(endTime) && net.isAfter(endTime)) || (nst.isBefore(startTime) && net.isBefore(startTime))){
        return false;
    }
    return true
}

exports.editBooking = async (req,res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const booking = cabBooking.findById(id);
        if(!booking){
            res.status(404).send("The booking with the given ID was not found.");
            return;
        }
        const cabType = booking.cabType;
        const cab = cab.findOne({type: cabType});


        if(cabType != newData.cabType){
            // delete the booking from before
            // add to 
        }

        const conflictingBooking = cab.bookings.find((b) => isConflicting(b, moment(newstartTime,'YYYY-MM-DDTHH:mm'), moment(startTime,'YYYY-MM-DDTHH:mm').add(minTime,'m')));


    } catch (error) {
        
    }
}

exports.bookCab = async (req, res) => {
    const { cabType, startTime, minTime, email, source, destination } = req.body;

    // Find cabs of the specified type
    const cab = await Cab.findOne({ type: cabType });
    if (!cab) {
        return res.status(404).send("No cabs found of type " + cabType);
    }

    // Check for conflicting bookings
    const conflictingBooking = cab.bookings.find((b) => isConflicting(b, moment(startTime,'YYYY-MM-DDTHH:mm'), moment(startTime,'YYYY-MM-DDTHH:mm').add(minTime,'m')));
    if (conflictingBooking) {
        return res.status(409).send("Conflicting booking");
    }

    // Create a new booking
    const newBooking = new CabBooking({
        cabType,
        startTime,
        endTime,
        email,
        source,
        destination
    });

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