import React, { useState } from "react";
import Graph from "./Graph";
import "./CabBookingForm.css";

const CabBookingForm = () => {
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [email, setEmail] = useState("");

  const handleSourceLocationChange = (e) => {
    setSourceLocation(e.target.value);
  };

  const handleDestinationLocationChange = (e) => {
    setDestinationLocation(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = new Date(e.target.value);
    const currentTime = new Date();
    if (selectedTime < currentTime) {
      alert("Please select a future date and time.");
      return;
    }
    setStartTime(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your logic for booking the cab
    console.log("Source Location:", sourceLocation);
    console.log("Destination Location:", destinationLocation);
    console.log("Start Time:", startTime);
    console.log("Email:", email);

    // Parse the startTime string into a Date object
    const startTimeDate = new Date(startTime);

    // Check if startTimeDate is a valid Date object
    if (isNaN(startTimeDate.getTime())) {
      console.error("Invalid start time:", startTime);
      return; // Exit the function if startTime is not a valid Date object
    }

    console.log("Parsed Start Time:", startTimeDate);

    const minutesToAdd = 32;
    const newDate = new Date(startTimeDate.getTime() + minutesToAdd * 60000); // 60000 milliseconds in a minute

    // Format the new date as a string
    const formattedDate = newDate.toISOString();

    console.log("New Date:", formattedDate); // Output: "2024-03-15T00:10:00.000Z"
  };

  return (
    <>
      <h2 className="top-heading">Cab Booking</h2>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="sourceLocation">Source Location:</label>
            <input
              type="text"
              id="sourceLocation"
              value={sourceLocation}
              onChange={handleSourceLocationChange}
              required
            />
            <label htmlFor="destinationLocation">Destination Location:</label>
            <input
              type="text"
              id="destinationLocation"
              value={destinationLocation}
              onChange={handleDestinationLocationChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              required
            />

            <button type="submit">Book Cab</button>
          </form>
        </div>
        <div className="other-content">
          <Graph />
        </div>
      </div>
    </>
  );
};

export default CabBookingForm;