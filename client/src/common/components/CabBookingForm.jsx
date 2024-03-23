import React, { useState } from "react";
import Graph from "./Graph";
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
    setMinTimeData({ shortestPath: { path: [], minTime: null } })
  };

  const handleSourceLocationChange = (e) => {
    setSourceLocation(e.target.value);
  };

  const handleDestinationLocationChange = (e) => {
    setDestinationLocation(e.target.value);
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
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
      const response = await fetch("https://myvahan-server.onrender.com/api/bookings/book-cab", {
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

      console.log("data fetched" , response);

      // Handle response
      if (response.ok) {
        // Handle success
        swal.fire("Success", "Cab booked successfully!", "success");
      } else {
        // Handle failure
        alert("Failed to book the cab. Please try again later.");
      }
    } catch (error) {
      console.error("Error booking cab:", error);
      alert("An error occurred while booking the cab. Please try again later.");
    }finally{
      resetForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (sourceLocation === destinationLocation) {
      alert("Source and destination locations cannot be the same.");
      return;
    }
  
    const selectedTime = moment(startTime);
    const currentTime = moment();
    if (selectedTime.isBefore(currentTime)) {
      alert("Please select a future date and time.");
      return;
    }
  
    // Fetch minimum time from backend
    const minTimeResponse = await fetch(
      `https://myvahan-server.onrender.com/api/places/shortest-path/${sourceLocation}/${destinationLocation}`
    );
    const minTimeData = await minTimeResponse.json();
    console.log(minTimeData);
    setMinTimeData(minTimeData); // Update minTimeData state
  
    const minTime = minTimeData.shortestPath.minTime;
    setTime(minTime); // Set the minimum time
  
    // Prepare the request body
    const requestBody = {
      startTime: moment(startTime).toISOString(),
      endTime: moment(startTime).add(minTime, "minutes").toISOString(),
    };
  
    // Fetch available cab options based on start and end time
    const availCabsResponse = await fetch("https://myvahan-server.onrender.com/api/bookings/available-cabs", {
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
      <h2 className=" text-blue ml-20 text-center mt-8 text-4xl mb-4">Cab Booking Form</h2>
      <div className="flex flex-col sm:flex-col lg:flex-row justify-center items-center gap-4">
        <div className="form-container bg-white text-black p-4 shadow-md rounded-lg w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="sourceLocation" className="block mb-2">Source Location:</label>
            <select
              id="sourceLocation"
              value={sourceLocation}
              onChange={handleSourceLocationChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded-md w-full text-gray-300"
            >
              <option value="">Select Source Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
  
            <label htmlFor="destinationLocation" className="block mb-2">Destination Location:</label>
            <select
              id="destinationLocation"
              value={destinationLocation}
              onChange={handleDestinationLocationChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded-md w-full text-gray-300"
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
  
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="enter your email id"
              required
              className="p-2 mb-4 border border-gray-300 rounded-md w-full placeholder-gray-300"
            />
            <label htmlFor="startTime" className="block mb-2">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded-md w-full text-gray-300"
            />
  
            <button type="submit" className="bg-blue-500 text-white py-2 mb-4 rounded-md w-full">Check Available Cabs</button>
            {showCabOptions && (
              <div>
                <div className="select-container mb-4">
                  <label className="select-label" htmlFor="availableCabs">Cab Type Available:</label>
                  <select id="availableCabs" onChange={handleCabSelect} className="p-2 border border-gray-300 rounded-md w-full">
                    <option value="">Select Available Cab</option>
                    {cabOptions.map((cab, index) => (
                      <option key={index} value={cab.type}>
                        {cab.type} Price: {cab.ppm * parseInt(time)} 
                      </option>
                    ))}
                  </select>
                  <div className="select-arrow"></div>
                </div>
                <div>
                  <button onClick={handleBooking} className="bg-blue-500 text-white py-2 mb-4 rounded-md w-full">Book Cab</button>
                </div>
              </div>
            )}
            
          </form>
        </div>
        <div className="mx-4 my-4">
          <Graph shortestPath={minTimeData?.shortestPath} />
        </div>
      </div>
    </>
  );
  
  
  
};

export default CabBookingForm;