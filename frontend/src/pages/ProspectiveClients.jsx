import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProspectiveClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5050/prospective-clients');
        if (response.data.success) {
          setClients(response.data.data);
        } else {
          setError('Error fetching top clients');
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
      <h2>Propsective Clients</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <li key={index}>
              <p>Client ID: {client.id}</p>
              <p>First Name: {client.first_name}</p>
              <p>Last Name: {client.last_name}</p>
              <p>Email: {client.email}</p>
            </li>
          ))
        ) : (
          <p>No top clients found</p>
        )}
      </ul>
    </div>
  );
};

export default ProspectiveClients;
