import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BadClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5050/bad-clients');
        if (response.data.success) {
          setClients(response.data.data);
        } else {
          setError('Error fetching bad clients');
        }
      } catch (err) {
        setError('Error fetching bad clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2>Bad Clients</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <li key={index}>
              <p>Client ID: {client.customer_id}</p>
              <p>Order ID: {client.order_id}</p>
            </li>
          ))
        ) : (
          <p>No bad clients found</p>
        )}
      </ul>
    </div>
  );
};

export default BadClients;
