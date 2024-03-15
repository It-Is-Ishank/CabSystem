import React, { useState } from "react";
import Graph from "./Graph";
import "./CabBookingForm.css";
import moment from "moment";
import swal from "sweetalert2";

const locations = ["A", "B", "C", "D", "E", "F"];

const CabBookingForm = () => {
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [email, setEmail] = useState("");
  const [cabOptions, setCabOptions] = useState([]);
  const [showCabOptions, setShowCabOptions] = useState(false);
  const [time, setTime] = useState(null);
  const [bookedCab, setBookedCab] = useState(null); // State variable for booked cab type
  const [minTimeData, setMinTimeData] = useState({ shortestPath: { path: [], minTime: null } });

  const resetForm = () => {
    setSourceLocation("");
    setDestinationLocation("");
    setStartTime("");
    setEmail("");
    setCabOptions([]);
    setShowCabOptions(false);
    setTime(null);
    setBookedCab(null);
  };

  const handleSourceLocationChange = (e) => {
    setSourceLocation(e.target.value);
  };

  const handleDestinationLocationChange = (e) => {
    setDestinationLocation(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = moment(e.target.value);
    const currentTime = moment();
    if (selectedTime.isBefore(currentTime)) {
      alert("Please select a future date and time.");
      return;
    }
    setStartTime(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCabSelect = (e) => {
    const selectedCabType = e.target.value;
    setBookedCab(selectedCabType); // Set the booked cab type
  };

  const handleBooking = async () => {
    if (!bookedCab) {
      alert("No cab has been selected yet.");
      return;
    }

    const startTimeUTC = moment(startTime).toISOString(); // Convert start time to UTC format
    const endTimeUTC = moment(startTime).add(time, "minutes").toISOString(); // Calculate end time and convert to UTC format

    // Make a POST request to book the cab
    try {
      const response = await fetch("/api/bookings/book-cab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cabType: bookedCab,
          startTime: startTimeUTC,
          endTime: endTimeUTC,
          minTime: time,
          email,
          source: sourceLocation,
          destination: destinationLocation,
        }),
      });

      // Handle response
      if (response.ok) {
        // Handle success
        swal("Success", "Cab booked successfully!", "success");
        resetForm();
      } else {
        // Handle failure
        alert("Failed to book the cab. Please try again later.");
      }
    } catch (error) {
      console.error("Error booking cab:", error);
      alert("An error occurred while booking the cab. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sourceLocation === destinationLocation) {
      alert("Source and destination locations cannot be the same.");
      return;
    }

    // Fetch minimum time from backend
    const minTimeResponse = await fetch(
      `/api/places/shortest-path/${sourceLocation}/${destinationLocation}`
    );
    const minTimeData = await minTimeResponse.json();
    setMinTimeData(minTimeData); // Update minTimeData state

    const minTime = minTimeData.shortestPath.minTime;
    setTime(minTime); // Set the minimum time

    // Prepare the request body
    const requestBody = {
      startTime: moment(startTime).toISOString(),
      endTime: moment(startTime).add(minTime, "minutes").toISOString(),
    };

    // Fetch available cab options based on start and end time
    const availCabsResponse = await fetch("/api/bookings/available-cabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const availCabsData = await availCabsResponse.json();

    // Update cab options state and show the select element
    setCabOptions(availCabsData);
    setShowCabOptions(true);
  };

  return (
    <>
      <h2 className="top-heading text-blue">Cab Booking</h2>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="sourceLocation">Source Location:</label>
            <select
              id="sourceLocation"
              value={sourceLocation}
              onChange={handleSourceLocationChange}
              required
            >
              <option value="">Select Source Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <label htmlFor="destinationLocation">Destination Location:</label>
            <select
              id="destinationLocation"
              value={destinationLocation}
              onChange={handleDestinationLocationChange}
              required
            >
              <option value="">Select Destination Location</option>
              {locations
                .filter((loc) => loc !== sourceLocation)
                .map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
            </select>

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

            <button type="submit">Check Available Cabs</button>
            {showCabOptions && (
              <div>
                <div>
                  <label>Cab Type Available</label>
                  <select onChange={handleCabSelect}>
                    <option value="">Select Available Cab</option>
                    {cabOptions.map((cab, index) => (
                      <option key={index} value={cab.type}>
                        {cab.type} Price: {cab.ppm * parseInt(time)}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button onClick={handleBooking}>Book Cab</button>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="other-content">
          <Graph shortestPath={minTimeData.shortestPath.path}/>
        </div>
      </div>
    </>
  );
};

export default CabBookingForm;