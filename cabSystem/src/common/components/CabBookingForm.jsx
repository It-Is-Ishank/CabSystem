import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

const CabBookingForm = () => {
  const { register, handleSubmit } = useForm();
  const [startTime, setStartTime] = useState(new Date()); // Properly initialize startTime

  const onSubmit = async (data) => {
    try {
      // Destructure form data
      const { source, destination } = data;

      // Call the shortest path API
      const response = await fetch(`http://localhost:8080/api/places/shortest-path/${source}/${destination}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Shortest path data:', responseData);

      // Calculate end time here using the shortest path data and startTime

      // Call the parent component's function to handle step submission
      // onStepSubmit({ sourceLocation: source, destinationLocation: destination, startTime, endTime });
    } catch (error) {
      console.error('Error:', error.message); // Proper error logging
    }
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
