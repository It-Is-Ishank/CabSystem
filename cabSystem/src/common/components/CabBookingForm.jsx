import React, { useState } from 'react';
import moment from 'moment';

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
    const selectedTime = moment(e.target.value);
    const currentTime = moment();
    if (selectedTime.isBefore(currentTime)) {
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
    
    const startTimeMoment = moment(startTime, 'YYYY-MM-DDTHH:mm');

    // Add 32 minutes to the Moment object
    const newTimeMoment = startTimeMoment.add(32, 'minutes');

    // Format the updated Moment object back to a string
    const newStartTime = newTimeMoment.format('YYYY-MM-DDTHH:mm');

    console.log('Updated Start Time:', newStartTime);
    
};

  return (
    <div>
      <h2>Cab Booking</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sourceLocation">Source Location:</label>
          <select {...register('source', { required: true })}>
            <option value="">Select source</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <div>
          <label htmlFor="destinationLocation">Destination Location:</label>
          <select {...register('destination', { required: true })}>
            <option value="">Select destination</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <DatePicker
            selected={startTime}
            onChange={date => setStartTime(date)} // Properly update startTime
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="dd-MM-yyyy HH:mm"
            id="startTime"
            required
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CabBookingForm;
