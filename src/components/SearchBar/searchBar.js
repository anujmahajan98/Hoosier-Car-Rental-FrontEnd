import React, { useState,useEffect } from 'react';
import { Link, useHistory,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './SearchBar.css';
function SearchBar(props) {
  // const [searchTerm, setSearchTerm] = useState('');
  const [carType, setCarType] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // new state for start date
  const [endDate, setEndDate] = useState(new Date()); // new state for end date
  const history = useHistory();
  const location = useLocation();
  //const [userData, setUserData] = useState('');
  //const [data1, setData1] = useState('');
  const userEmail = props.location.state.data;

  // const handleSearchInput = (event) => {
  //   setSearchTerm(event.target.value);
  // };



  const handleSearchSubmit = (event) => {
    if (event) {
      event.preventDefault(); // add check for event object
    }
  
  };
  
  

  function handleBothClicks(event) {
    if (event) {
      event.preventDefault(); // add check for event object
    }
    searchCars();
    handleSearchSubmit();
  }

  const handleBookingSubmit = (event) => {
    if (event) {
      event.preventDefault(); // add check for event object
    }
  
  };

  const handleBoth = (event) => {
    if (event) {
      event.preventDefault(); // add check for event object
    }
    handleBooking();
    handleBookingSubmit();
  
  };

  const handleBooking = (event) => {
    if (event) {
      event.preventDefault();
      console.log("entering into event view bookings",event)
    }
    if (userEmail === '') {
      console.log('userEmail field is empty');
    } else {
      console.log(userEmail)
      fetch('https://hoosier-backend.onrender.com/bookinghistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          history.push('/UserDashboard', { data: data })//send booking details to userDashboard
          console.log(data)
          })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCarTypeSelect = (event) => {
    setCarType(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const searchCars = (event) => {
    if (event) {
      event.preventDefault();
      console.log("entering into event search cars",event)
    }
    if (carType === '' || startDate === '' || endDate === '') {
      console.log('Please enter all the fields');
    } else {
      console.log(carType)
      console.log(endDate)
      console.log(startDate);
      fetch('https://hoosier-backend.onrender.com/ownercars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carType, startDate, endDate }),
      })
        .then((response) => response.json())
        .then((data) => {
          // history.push('/UserView',{data: data, email: userEmail });
          const userEmail = location.state.data;
          const dataArray = [data]; 
          dataArray.push(userEmail);
          history.push('/UserView', { data : dataArray});
          console.log(dataArray)
          })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className='searchBarComponent' >
      <form onSubmit={handleSearchSubmit}>
        <div>
          <select name="dropdown" value={carType} onChange={handleCarTypeSelect} className='carTypeSelect'>
            <option value=''>All Car Types</option>
            <option value='SUV'>SUV</option>
            <option value='Sedan'>Sedan</option>
            <option value='Hatchback'>Hatchback</option>
          </select>
        </div>
        <div>
          <label className="Date" htmlFor="startDate">Start Date:</label>
          <input name="startDate" className="dateInput" type="date" id="startDate" value={startDate.toISOString().substr(0,10)} min={new Date().toISOString().substr(0,10)} onChange={(e) => handleStartDateChange(new Date(e.target.value))} />
        </div>
        <div>
          <label className="Date" htmlFor="endDate">End Date:</label>
          <input name="endDate" className="dateInput" type="date" id="endDate" value={endDate.toISOString().substr(0,10)} min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0,10)} onChange={(e) => handleEndDateChange(new Date(e.target.value))} />
        </div>
        <button type='submit' onClick={handleBothClicks} id ="searchButton"  className='searchButton'>Search</button>
        
      </form>
      <form>
      <Link>
        <Button className = "BookingHistory" onClick={handleBoth} style={{cursor: 'pointer',
                    transition: 'all 100ms ease-in-out'}}> Booking details</Button>
      </Link>
      </form>
    </div>
  );
}

export default SearchBar;
