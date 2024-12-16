import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThisMonth = () => {
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThisMonth = async () => {
      try {
        const response = await axios.get('http://localhost:5050/this-month-quotes');
        if (response.data.success) {
          setMonth(response.data.data);
        } else {
          setError('Error fetching top clients');
        }
      } catch (err) {
        setError('Error fetching top clients');
      } finally {
        setLoading(false);
      }
    };

    fetchThisMonth();
  }, []);

  return (
    <div>
      <h2>This Month Quotes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {month.length > 0 ? (
          month.map((client, index) => (
            <li key={index}>
              <p>Order ID: {client.order_id}</p>
              <p>Cutomer_ID: {client.customer_id}</p>
              <p>Adress: {client.address}</p>
              <p>Square_Feet: {client.square_feet}</p>
              <p>Budget: {client.budget}</p>
              <p>Picture:
                <a href={client.picture}>{client.order_id} URL</a>
              </p>
              <p>Date: {client.date}</p>
              <p>Quote Status: {client.status}</p>
              <p>Payment Status: {client.payment_status}</p>
            </li>
          ))
        ) : (
          <p>No quotes found for this month.</p>
        )}
      </ul>
    </div>
  );
};

export default ThisMonth;
