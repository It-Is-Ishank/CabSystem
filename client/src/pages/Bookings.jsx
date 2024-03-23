import React, { useEffect, useState } from "react";
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
      const response = await fetch("https://myvahan-server.onrender.com/api/bookings/get-all-bookings");
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
            `https://myvahan-server.onrender.com/api/bookings/delete-booking/${bookingId}`,
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
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-center text-5xl mb-6">All Bookings</h1>
      <div className="flex justify-center mb-4">
      <div className="flex justify-center items-center mb-2">
  
</div>

      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Index</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Email</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Progress (%)</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Status</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Source</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Destination</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Start Date & Time</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="py-2 px-4 border">Loading...</td>
              </tr>
            ) : (
              bookings.length > 0 ? (
                bookings.map((booking, index) => {
                  const { progress, status } = calculateProgressAndStatus(
                    booking.startTime,
                    booking.endTime
                  );
                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-500 hover:bg-gray-400" : "bg-black hover:bg-gray-400"}>
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{booking.email}</td>
                      <td className="py-2 px-4 border">{progress}</td>
                      <td className="py-2 px-4 border">{status}</td>
                      <td className="py-2 px-4 border">{booking.source}</td>
                      <td className="py-2 px-4 border">{booking.destination}</td>
                      <td className="py-2 px-4 border">{new Date(booking.startTime).toLocaleString()}</td>
                      <td className="py-2 px-4 border">
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded"
                          onClick={() => handleDeleteBooking(booking._id, status)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-2 px-4 border">No bookings found</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Bookings;
