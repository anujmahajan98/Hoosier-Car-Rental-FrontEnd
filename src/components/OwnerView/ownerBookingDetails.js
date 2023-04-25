import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OwnerBookingDetails = () => {
  const [booking, setBooking] = useState([]);
  const location = useLocation();
  const ownerEmail = location.state?.data;

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        const response = await fetch('hoosierbackend.azurewebsites.net/ownerBookingDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ownerEmail })
        });
        const data = await response.json();
        console.log('Booking Data is ',data)
        setBooking(JSON.parse(data));
        
      } catch (error) {
        console.error("Error fetching owner bookings:", error);
      }
    };
    if (ownerEmail) {
      console.log('call FetchData')
      fetchData();
    }
  }, [ownerEmail]);
  // console.log('In Booking')
  //   fetch('http://localhost:5001/ownerBookingDetails', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ ownerEmail })
  //     })
  //     .then(response => response.text())
  //       .then(data => {
  //         console.log('Booking Details are')
  //         console.log(data)
  //         setBooking(JSON.parse(data));
  //         console.log(booking)
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });

  return (
    <div>
      <h1>OWNER BOOKING DETAILS</h1>
      {booking.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Address</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {booking.map(item => (
              <tr key={item._id}>
                <td>{item.userName}</td>
                <td>{item.userAddress}</td>
                <td>{item.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default OwnerBookingDetails;
