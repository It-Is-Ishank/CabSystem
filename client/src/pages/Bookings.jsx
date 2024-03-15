import React, { useEffect, useState } from "react";
import "./Bookings.css";
import Swal from "sweetalert2";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrent] = useState(new Date());

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle progress percentage
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(new Date());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings/get-all-bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setIsLoading(false);
    }
  };

  // Function to calculate progress and status based on current time and booking start and end times
  const calculateProgressAndStatus = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const current = currentTime.getTime();

    if (current < start.getTime()) {
      return { progress: 0, status: "Pending" };
    } else if (current >= start.getTime() && current <= end.getTime()) {
      const duration = end.getTime() - start.getTime();
      const elapsed = current - start.getTime();
      const progress = (elapsed / duration) * 100;
      return { progress: progress.toFixed(2), status: "Ongoing" };
    } else {
      return { progress: 100, status: "Completed" };
    }
  };

  // Function to handle deletion of bookings
  const handleDeleteBooking = async (bookingId, status) => {
    console.log("Status:", status);
    if (status === "Ongoing") {
      Swal.fire({
        icon: "error",
        title: "Cannot delete ongoing booking",
        text: "You cannot delete a booking that is currently ongoing.",
      });
      return;
    }

    // Show confirmation popup
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `/api/bookings/delete-booking/${bookingId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }), // Include status in the request body
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete booking");
          }

          // Remove the deleted booking from the local state
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== bookingId)
          );

          Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting booking:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete the booking. Please try again later.",
          });
        }
      }
    });
  };

  return (
    <div className="bookings-container">
      <h1 className="bookings-container-heading">All Bookings</h1>
      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Email</th>
              <th>Progress (%)</th>
              <th>Status</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Start Date & Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : (
              bookings.map((booking, index) => {
                const { progress, status } = calculateProgressAndStatus(
                  booking.startTime,
                  booking.endTime
                );
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{booking.email}</td>
                    <td>{progress}</td>
                    <td>{status}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{new Date(booking.startTime).toLocaleString()}</td>
                    <td>
                      <button
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleDeleteBooking(booking._id, status)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
