import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DifficultClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5050/difficult-clients');
        if (response.data.success) {
          setClients(response.data.data);
        } else {
          setError('Error fetching difficult clients');
        }
      } catch (err) {
        setError('Error fetching top clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2>Difficult Clients</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <li key={index}>
              <p>Customer ID: {client.customer_id}</p>
            </li>
          ))
        ) : (
          <p>No Difficult clients found</p>
        )}
      </ul>
    </div>
  );
};

export default DifficultClients;
