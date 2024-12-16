import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const ViewBill = () => {
    const {order_id} = useParams()
    const [bills, setBills] = useState([])

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5050/getbill/${order_id}`);
        const data = await response.json();
        setBills(data.data); // Load orders with their default statuses
      } catch (error) {
        console.error('Error fetching Bill:', error);
      }
    };
    fetchOrders();
  }, [order_id]);

  const handleActionClick = async (bill_id, selectedAction) => {
    try {
      const response2 = await axios.patch(`http://localhost:5050/updatebill/${order_id}`, {
        bill_id: bill_id,
        bill_status: selectedAction,
      })
      if (response2.data){
        
        const response3 = await axios.patch(`http://localhost:5050/updatepaystatus/${order_id}`, {
          order_id: order_id,
          payment_status: selectedAction
        });
        if (response3.data) {
          console.log("Payment Status Updated Successfully:", response3.data)
        }}
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }


  return (
    <div className="container">
      <h2>Bill for {order_id}</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount Due</th>
            <th>Actions</th>
            <th>Bill_Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.bill_id}>
              <td>{bill.order_id}</td>
              <td>{bill.total_amount}</td>
              <td>
                {bill.bill_status === 'Unpaid' && (
                    <div>
                    <Link to={`/paybill/${bill.bill_id}`}>
                      <button onClick={() => handleActionClick(bill.bill_id, 'Unpaid')}>
                        Pay
                      </button>
                    </Link>
                    <button onClick={() => handleActionClick(bill.bill_id, 'Rejected')}>
                      Reject
                    </button>
                    <Link to={`/chat/${bill.order_id}`}>
                    <button>Negotiate</button>
                  </Link>
                  </div>
                )}
              </td>
              <td>{bill.bill_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBill;
