import React, { useState,useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import './SearchBar.css';
function SearchBar() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [carType, setCarType] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // new state for start date
  const [endDate, setEndDate] = useState(new Date()); // new state for end date
  const history = useHistory();
  const location = useLocation();
  //const [userData, setUserData] = useState('');
  //const [data1, setData1] = useState('');

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
    <div className='searchBarComponent'>
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
          <input name="startDate" type="date" id="startDate" value={startDate.toISOString().substr(0,10)} min={new Date().toISOString().substr(0,10)} onChange={(e) => handleStartDateChange(new Date(e.target.value))} />
        </div>
        <div>
          <label className="Date" htmlFor="endDate">End Date:</label>
          <input name="endDate" type="date" id="endDate" value={endDate.toISOString().substr(0,10)} min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0,10)} onChange={(e) => handleEndDateChange(new Date(e.target.value))} />
        </div>
        <button type='submit' onClick={handleBothClicks} id ="searchButton" className='searchButton'>Search</button>
        
      </form>
    </div>
  );
}

export default SearchBar;
