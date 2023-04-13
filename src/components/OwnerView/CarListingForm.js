import { useState } from 'react';
import React from 'react';
import './CarListingForm.css';
import { useHistory, useLocation } from 'react-router-dom';
import  axios  from 'axios';
function CarListingForm() {
  // State variables for form fields and error messages
  const [ownerName, setOwnerName] = useState('');
  const [ownerNameError, setOwnerNameError] = useState('');
  const [area, setArea] = useState('');
  const [areaError, setAreaError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [carCompany, setCarCompany] = useState('');
  const [carCompanyError, setCarCompanyError] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carModelError, setCarModelError] = useState('');
  const [carType, setCarType] = useState('');
  const [carTypeError, setCarTypeError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [image, setImage] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carNumberError, setCarNumberError] = useState('');
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState('');

  // Handle form submission
  const history = useHistory();
  const location = useLocation();
  const userEmail = location.state?.data;
  console.log(userEmail)
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      // axios.post('http://localhost:5001/CarListingForm', 
      //   { ownerName, carCompany, carModel, carType, startDate, endDate, image, otherDetails, userEmail, carNumber })
      //   .then(response => response.text())
      //   .then(data => {
      //     console.log(data);
      //     if (data === 'valid') {
      //       history.push('/OwnerView');
      //       window.location.reload();
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });



      
        fetch('http://localhost:5001/CarListingForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ownerName, carCompany, carModel, carType, startDate, endDate, image, otherDetails, userEmail, carNumber, price })
              })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data === 'valid'){
                    history.push('/OwnerView', { data: userEmail });
                    // window.location.reload();
                  }
                })
                .catch(error => {
                  console.error(error);
                });
    }
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    if (ownerName.trim() === '') {
      setOwnerNameError('Owner name is required');
      valid = false;
    } else {
      setOwnerNameError('');
    }
    // if (area.trim() === '') {
    //   setAreaError('Area is required');
    //   valid = false;
    // } else {
    //   setAreaError('');
    // }
    // if (address.trim() === '') {
    //   setAddressError('Address is required');
    //   valid = false;
    // } else {
    //   setAddressError('');
    // }
    // if (postalCode.trim() === '') {
    //     setPostalCodeError('Area is required');
    //     valid = false;
    //   } else {
    //     setPostalCodeError('');
    // }
    if (carCompany.trim() === '') {
        setCarCompanyError('Car company is required');
        valid = false;
    } else {
        setCarCompanyError('');
    }
    if (carModel.trim() === '') {
      setCarModelError('Car model is required');
      valid = false;
    } else {
      setCarModelError('');
    }
    if (carNumber.trim() === '') {
      setCarNumberError('Car Number is required');
      valid = false;
    } else {
      setCarNumberError('');
    }
    if (price.trim() === '') {
      setPriceError('Price is required');
      valid = false;
    } else {
      setPriceError('');
    }
    if (carType === '') {
      setCarTypeError('Car type is required');
      valid = false;
    } else {
      setCarTypeError('');
    }
    if (startDate.trim() === '') {
      setStartDateError('Start date is required');
      valid = false;
    } else {
      setStartDateError('');
    }
    if (endDate.trim() === '') {
      setEndDateError('End date is required');
      valid = false;
    } else {
      setEndDateError('');
    }
    return valid;
  };

  return (
    <form onSubmit={handleSubmit} className="car-listing-form" style={{width:'40%'}}>
      <label >
        Owner Name:
        <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} style={{marginBottom: '15px'}}/>
        {ownerNameError && <div className="error-message">{ownerNameError}</div>}
      </label>
      <br/>
      {/* <label>
        Area:
        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
        {areaError && <div className="error-message">{areaError}</div>}
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        {addressError && <div className="error-message">{addressError}</div>}
      </label>
      <br />
      <label>
        Postal code:
        <input type="number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        {postalCodeError && <div className="error-message">{postalCodeError}</div>}
      </label>
      <br /> */}
      <label>
        Car Company:
        <input type="text" value={carCompany} onChange={(e) => setCarCompany(e.target.value)} style={{marginBottom: '15px'}}/>
        {carCompanyError && <div className="error-message">{carCompanyError}</div>}
      </label>
      <br />
      <label>
        Car Model:
        <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} style={{marginBottom: '15px'}}/>
        {carModelError && <div className="error-message">{carModelError}</div>}
      </label>
      <br />
      <label>
        Car Number:
        <input type="text" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} style={{marginBottom: '15px'}}/>
        {carNumberError && <div className="error-message">{carNumberError}</div>}
      </label>
      <br />
      <label style={{marginbottom: '5px'}}>
        Car Type:
        <select value={carType} onChange={(e) => setCarType(e.target.value)} style={{width: '100%',
            padding: '8px',
            marginbottom: '15px',
            border: '1px solid #ddd',
            borderradius: '4px',
            boxsizing: 'border-box',
            fontsize: '14px'}}>
          <option value="">Select a car type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
        </select>
        {carTypeError && <div className="error-message">{carTypeError}</div>}
      </label>
      <br />
      <label>
        Start date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{marginBottom: '15px'}}/>
        {startDateError && <div className="error-message">{startDateError}</div>}
      </label>
      <br />
      <label>
        End date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{marginBottom: '15px'}}/>
        {endDateError && <div className="error-message">{endDateError}</div>}
      </label>
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{marginBottom: '15px'}}/>
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={{marginBottom: '15px'}}/>
        {priceError && <div className="error-message">{priceError}</div>}
      </label>
      <br />
      <label style={{width: '50%'}}>
        Other Details:
        <textarea value={otherDetails} onChange={(e) => setOtherDetails(e.target.value)} style={{marginBottom: '15px'}}/>
      </label>
      <br />
      <button type="submit" style={{marginTop:'20px', backgroundcolor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderradius: '4px',
    cursor: 'pointer',
    fontsize: '14px'}}>Submit</button>
    </form>
  );
}

export default CarListingForm;
