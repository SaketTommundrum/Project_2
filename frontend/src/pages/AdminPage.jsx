import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5050/admin');
        const data = await response.json();
        setOrders(data.data); // Load orders with their default statuses
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleActionClick = async (order_id, selectedAction) => {
    try {
      const response = await fetch(`http://localhost:5050/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: order_id,
          status: selectedAction,
        }),
      });

      if (response.ok) {
        // Update local state after successful backend update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id
              ? { ...order, status: selectedAction }
              : order
          )
        );
      } else {
        console.error('Failed to update status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container">
      <h2>Your Curious Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Address</th>
            <th>Square Feet</th>
            <th>Budget</th>
            <th>Pictures</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Payment_Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_id}</td>
              <td>{order.address}</td>
              <td>{order.square_feet}</td>
              <td>{order.budget}</td>
              <td>{order.pictures}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (
                  <div>
                    <Link to={`/davidchat/${order.order_id}`}>
                      <button onClick={() => handleActionClick(order.order_id, 'Pending')}>
                        Negotiate
                      </button>
                    </Link>
                    <button onClick={() => handleActionClick(order.order_id, 'Accepted')}>
                      Accept
                    </button>
                    <button onClick={() => handleActionClick(order.order_id, 'Rejected')}>
                      Reject
                    </button>
                  </div>
                )}
                {order.status === 'Accepted' && 
                <div>
                  <Link to={`/bills/${order.order_id}`}><button>Generate Bill</button></Link>
                </div>}
              </td>
              <td>{order.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
