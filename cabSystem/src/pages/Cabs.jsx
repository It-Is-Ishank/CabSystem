import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Cabs = () => {
  const [cabs, setCabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedCab, setEditedCab] = useState({ type: '', ppm: '', originalType: '' });

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cabs/getCabs');
      if (!response.ok) {
        throw new Error('Failed to fetch cabs');
      }
      const data = await response.json();
      setCabs(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cabs:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = (cab) => {
    setEditedCab({ ...cab, originalType: cab.type }); // Set edited cab data and original type
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cabs/editCab/${editedCab.originalType}`, // Use original type here
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: editedCab.type,
            ppm: editedCab.ppm,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to edit cab');
      }
      MySwal.fire('Success', 'Cab edited successfully', 'success');
      fetchCabs();
      setEditedCab({ type: '', ppm: '', originalType: '' }); // Reset edited cab data
    } catch (error) {
      console.error('Error editing cab:', error);
      MySwal.fire('Error', 'Failed to edit cab', 'error');
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">All Cabs</h1>
      </div>

      <section className="py-1 bg-blueGray-50">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blueGray-50 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Cab Type
              </th>
              <th className="px-6 py-3 bg-blueGray-50 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Price per Mile
              </th>
              <th className="px-6 py-3 bg-blueGray-50 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                  Loading...
                </td>
              </tr>
            ) : (
              cabs.map((cab, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="text"
                        value={editedCab.type}
                        onChange={(e) => setEditedCab({ ...editedCab, type: e.target.value })}
                      />
                    ) : (
                      cab.type
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editedCab.originalType === cab.type ? (
                      <input
                        type="text"
                        value={editedCab.ppm}
                        onChange={(e) => setEditedCab({ ...editedCab, ppm: e.target.value })}
                      />
                    ) : (
                      cab.ppm
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editedCab.originalType === cab.type ? (
                      <>
                        <button
                          className="text-green-600 hover:text-green-900 mr-2"
                          onClick={() => saveChanges()}
                        >
                          Save
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setEditedCab({ type: '', ppm: '', originalType: '' })}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-blue-900"
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
      </section>
    </div>
  );
};

export default Cabs;
