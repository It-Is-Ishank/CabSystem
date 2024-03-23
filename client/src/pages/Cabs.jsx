import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"

const Cabs = () => {
  const [cabs, setCabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedCab, setEditedCab] = useState({
    type: "",
    ppm: "",
    originalType: "",
  });
  

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const response = await fetch("https://myvahan-server.onrender.com/api/cabs/getCabs");
      if (!response.ok) {
        throw new Error("Failed to fetch cabs");
      }
      const data = await response.json();
      setCabs(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cabs:", error);
      setIsLoading(false);
    }
  };

  const handleEdit = (cab) => {
    setEditedCab({ ...cab, originalType: cab.type }); // Set edited cab data and original type
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `https://myvahan-server.onrender.com/api/cabs/editCab/${editedCab.originalType}`, // Use original type here
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: editedCab.type,
            ppm: editedCab.ppm,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit cab");
      }
      Swal.fire("Success", "Cab edited successfully", "success");
      fetchCabs();
      setEditedCab({ type: "", ppm: "", originalType: "" }); // Reset edited cab data
    } catch (error) {
      console.error("Error editing cab:", error);
      Swal.fire("Error", "Failed to edit cab", "error");
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 " >
      <h1 className="text-center text-5xl mb-6">All Cabs Edit Panel</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Cab Type</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border cursor-pointer" >Price per Minute</th>
              <th className="bg-gray-300 text-gray-700 font-semibold text-uppercase py-2 px-4 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="py-2 px-4 border">Loading...</td>
              </tr>
            ) : (
              cabs.map((cab, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-500 hover:bg-gray-400" : "bg-black hover:bg-gray-400"}>
                  <td className="py-2 px-4 border">
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="text"
                        value={editedCab.type}
                        onChange={(e) =>
                          setEditedCab({ ...editedCab, type: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      cab.type
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="number"
                        value={editedCab.ppm}
                        onChange={(e) =>
                          setEditedCab({ ...editedCab, ppm: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      cab.ppm
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {editedCab.originalType === cab.type ? (
                      <>
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                          onClick={() => saveChanges()}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded"
                          onClick={() =>
                            setEditedCab({
                              type: "",
                              ppm: "",
                              originalType: "",
                            })
                          }
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => handleEdit(cab)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cabs
