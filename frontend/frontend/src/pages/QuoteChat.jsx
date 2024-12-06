import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const QuoteChat = () => {
    const {order_id} = useParams()
    const [chat, setChat] = useState('');
    // const [customerId, setCustomerId] = useState('')
    // const [orderId, setOrderId] = useState(); // State for order ID
    const [message, setMessage] = useState(""); // State for the message
    const [responseMessage, setResponseMessage] = useState(""); // State for server response

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5050/chatget/${order_id}`);
            const chats_ = response.data.data; 
            console.log(chats_)
            setChat(chats_); // Update the state with user data
          } catch (error) {
            console.error("Error fetching user data: ", error.message);
          }
        };
        fetchData();
      }, [order_id]);

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5050/chat/${order_id}`, {
        orderid: chat[0].order_id,
        customerid: chat[0].customer_id,
        message,
      });
      console.log('Message Sent: ', response.data)
      setResponseMessage("Message sent successfully!")
      setMessage("")// Clear the message field
    } catch (error) {
      setResponseMessage("Failed to send message. Please try again.")
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Send a Chat Message</h1>
      <form onSubmit={handleSubmit1} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
      {chat ? (
                <div>
                    <p>Order_Id: {chat[0].order_id}</p>
                    <p>Customer_Id: {chat[0].customer_id}</p>
                </div>
            ) : (
                <p>No Messages</p>
            )}  
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            style={{ marginBottom: "10px", padding: "8px" }}
          ></textarea>
        </label>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none" }}>
          Send Message
        </button>
      </form>
      {responseMessage && <p style={{ marginTop: "20px", color: "green" }}>{responseMessage}</p>}
    </div>
  );
};

export default QuoteChat;
