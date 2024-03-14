import React, { useState } from 'react';

const CabBookingForm = () => {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [email, setEmail] = useState('');

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
      alert('Please select a future date and time.');
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
    console.log('Source Location:', sourceLocation);
    console.log('Destination Location:', destinationLocation);
    console.log('Start Time:', startTime);
    console.log('Email:', email);
    // You can perform further actions like sending data to backend or API call
  };

  return (
    <div>
      <h2>Cab Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sourceLocation">Source Location:</label>
          <input
            type="text"
            id="sourceLocation"
            value={sourceLocation}
            onChange={handleSourceLocationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destinationLocation">Destination Location:</label>
          <input
            type="text"
            id="destinationLocation"
            value={destinationLocation}
            onChange={handleDestinationLocationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            required
          />
        </div>
        
        <button type="submit">Book Cab</button>
      </form>
    </div>
  );
};

export default CabBookingForm;
