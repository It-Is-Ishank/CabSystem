import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Cabs.css";

const MySwal = withReactContent(Swal);

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
      MySwal.fire("Success", "Cab edited successfully", "success");
      fetchCabs();
      setEditedCab({ type: "", ppm: "", originalType: "" }); // Reset edited cab data
    } catch (error) {
      console.error("Error editing cab:", error);
      MySwal.fire("Error", "Failed to edit cab", "error");
    }
  };

  return (
    <div className="cabs-container">
      <h1 className="cabs-container-heading">All Cabs Edit Panel</h1>
      <div className="cabs-form-container">
        <table className="cabs-form-table">
          <thead>
            <tr>
              <th>Cab Type</th>
              <th>Price per Minute</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : (
              cabs.map((cab, index) => (
                <tr key={index}>
                  <td>
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="text"
                        value={editedCab.type}
                        onChange={(e) =>
                          setEditedCab({ ...editedCab, type: e.target.value })
                        }
                      />
                    ) : (
                      cab.type
                    )}
                  </td>
                  <td>
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="number"
                        value={editedCab.ppm}
                        onChange={(e) =>
                          setEditedCab({ ...editedCab, ppm: e.target.value })
                        }
                      />
                    ) : (
                      cab.ppm
                    )}
                  </td>
                  <td>
                    {editedCab.originalType === cab.type ? (
                      <>
                        <button
                          className="save-button"
                          onClick={() => saveChanges()}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-button"
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
                        className="edit-button"
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

export default Cabs;
