import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverdueBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:5050/overdue-bills');
        if (response.data.success) {
          setBills(response.data.data);
        } else {
          setError('Error fetching overdue bills');
        }
      } catch (err) {
        setError('Error fetching overdue bills');
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  return (
    <div>
      <h2>OverDue Bills</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {bills.length > 0 ? (
          bills.map((client, index) => (
            <li key={index}>
              <p>Client ID: {client.customer_id}</p>
              <p>Order ID: {client.order_id}</p>
            </li>
          ))
        ) : (
          <p>No overdue bills found</p>
        )}
      </ul>
    </div>
  );
};

export default OverdueBills;
