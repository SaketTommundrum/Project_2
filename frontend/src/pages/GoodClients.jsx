import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoodClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5050/good-clients');
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
      <h2>Good Clients</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <li key={index}>
              <p>Client ID: {client.customer_id}</p>
              <p>Order ID: {client.order_id}</p>
              <p>Bill Created Date: {client.create_bill_date}</p>
              <p>Pay Date: {client.pay_bill_date}</p>
            </li>
          ))
        ) : (
          <p>No good clients found</p>
        )}
      </ul>
    </div>
  );
};

export default GoodClients;
