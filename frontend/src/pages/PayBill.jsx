import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const PayBill = () => {
  const { bill_id} = useParams(); // Get the user's ID from the route
  const [orderId, setOrderId] = useState('')
  const [ amount, setAmount] = useState('')
  const [ userId, setUserId] = useState('')
  const [cardNumber,setCardNumber] = useState('')
  const navigate = useNavigate('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/getbillid/${bill_id}`);
        setOrderId(response.data.data[0].order_id);
        setAmount(response.data.data[0].total_amount) // Update the state with user data
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };
    fetchData();
  }, [bill_id]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5050/admin/${orderId}`);
          setUserId(response.data.data[0].customer_id); // Update the state with user data
        } catch (error) {
          console.error("Error fetching user data: ", error.message);
        }
      };
      fetchData();
    })

    const handleCard = async (e) => {
        e.preventDefault();
        try {
          // First, update credit card information
          const response1 = await axios.patch(`http://localhost:5050/updatecredit/${userId}`, {
            id:userId, 
            credit_card:cardNumber,
          });
      
          if (response1.data) {
            console.log("Card Update Success:", response1.data);
      
            // Then, update the bill status
            const response2 = await axios.patch(`http://localhost:5050/updatebill/${orderId}`, {
              bill_id: bill_id,
              bill_status: "Paid",
            });
      
            if (response2.data) {
              console.log("Bill Update Success:", response2.data);
              setCardNumber("");
              navigate(`/dashboard/${userId}`); // Navigate only after successful updates
            }
          }
        } catch (error) {
          console.error("Error in Payment Process: ", error.message);
        }
      };
      

  return (
    <div>
      {orderId ? (
        <div>
          <h2>Credit Card Info For : {userId}</h2>
          {/* Add more user-specific details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <form onSubmit={handleCard}>
            <h3>Total Amount to Pay: {amount} </h3>
            <div>
                <label>Credit Card Number:</label>
                <input
                name="credit info"
                type="number"
                maxLength="16" 
                placeholder="1234 5678 9012 3457"
                value={cardNumber}
                required 
                onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <button className="page-btn" type="submit">Pay</button>
        </form>
    </div>
  )
}

export default PayBill;
