import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  const [users, setUsers] = useState([])

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5050/admin')
        const data = await response.json()
        setUsers(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5050/delete/${id}`, { method: 'DELETE' })
      setUsers(users.filter(user => user.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank','noopener,noreferrer')
  }

  return (
    <div className="container">
        <h2>Your Curious Customers</h2>
        <button className='admin-btn' onClick={() => openInNewTab('/search')}>Go to the search page?</button>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Password</th>
              <th>Sign Up Time</th>
              <th>Sign In Time</th>
              <th>Updated Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.salary}</td>
                <td>{user.password}</td>
                <td>{new Date(user.sign_up_time).toLocaleString()}</td>
                <td>{user.sign_in_time ? new Date(user.sign_in_time).toLocaleString() : "Not Signed in"}</td>
                <td>{user.updated_time ? new Date(user.updated_time).toLocaleString() : "Not Updated"}</td>
                <td>
                  <Link to={`/update/${user.id}`}>
                    <button className="update-btn">Update</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AdminPage
