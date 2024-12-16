import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopClients = () => {
  const [topClients, setTopClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopClients = async () => {
      try {
        const response = await axios.get('http://localhost:5050/top-clients');
        if (response.data.success) {
          setTopClients(response.data.data);
        } else {
          setError('Error fetching top clients');
        }
      } catch (err) {
        setError('Error fetching top clients');
      } finally {
        setLoading(false);
      }
    };

    fetchTopClients();
  }, []);

  return (
    <div>
      <h2>Top Clients</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {topClients.length > 0 ? (
          topClients.map((client, index) => (
            <li key={index}>
              <p>Client ID: {client.customer_id}</p>
              <p>Order Count: {client.order_count}</p>
            </li>
          ))
        ) : (
          <p>No top clients found</p>
        )}
      </ul>
    </div>
  );
};

export default TopClients;
