import React, {useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillPage = () => {
  const { order_id } = useParams(); // Get the user's ID from the route
  const [total_amount, setTotal_Amount] = useState('');
  const navigate = useNavigate('')

  const handleNewBill = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`http://localhost:5050/bills/${order_id}`,{
        total_amount
      })
      if (response.data) {
        console.log("Bill has been successfully created: ", response.data);
        navigate(`/admin`); // Redirect to the unique dashboard
        setTotal_Amount('')
      }
    }catch(error){
      console.error('Billing Error: ', error)
    }
  };

  return (
    <div>
        <div>
          <h2>Create New Bill : {order_id}</h2>
          {/* Add more user-specific details as needed */}
        </div>
      <form onSubmit={handleNewBill}>
                <div>
                <p>Id: {order_id}</p>
                </div> 
            <div>
              <label>Total Bill</label>
                <input
                name="Total Bill"
                type="number"
                value={total_amount}
                placeholder="The total bill of this order"
                onChange={(e) => setTotal_Amount(e.target.value)}
                required
                />
            </div>
            <button className="page-btn" type="submit">Submit Bill</button>
        </form>
    </div>
  );
};

export default BillPage;
