import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LargestDriveway = () => {
  const [driveway, setDriveway] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriveway = async () => {
      try {
        const response = await axios.get('http://localhost:5050/largest-driveway');
        if (response.data.success) {
          setDriveway(response.data.data);
        } else {
          setError('Error fetching top clients');
        }
      } catch (err) {
        setError('Error fetching top clients');
      } finally {
        setLoading(false);
      }
    };

    fetchDriveway();
  }, []);

  return (
    <div>
      <h2>Largest DriveWays</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {driveway.length > 0 ? (
          driveway.map((client, index) => (
            <li key={index}>
              <p>Order ID: {client.order_id}</p>
              <p>Address: {client.address}</p>
              <p>Square_Feet: {client.square_feet}</p>
              <p>Budget: {client.budget}</p>
              <p>Date: {client.date}</p>
              <p>Quote Status: {client.status}</p>
              <p>Payment_status: {client.payment_status}</p>
            </li>
          ))
        ) : (
          <p>No Large Driveway clients found</p>
        )}
      </ul>
    </div>
  );
};

export default LargestDriveway;
