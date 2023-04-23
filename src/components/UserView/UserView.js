import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './UserView.css';

function UserView(props) {
  const history = useHistory();
  const location = useLocation();
  const docs = props.location.state.data[0];
  const userEmail = props.location.state.data[1];

  const data = [docs]
  data.push(userEmail)
  function handleDashboardClick() {
    history.push('/UserDashboard');
  }

  return (
    <div className="car-list" style={{ backgroundImage: `url('src/components/UserView/carsimages1.png')` }}>
      <h1>All Available Cars</h1>
      {/* Render each item as a list with a button for booking */}
      {docs.map(item => (
        <div key={item.id} className="car-item" style={{ border: '1px solid #ccc',
          borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1' }}>
              <strong>Owner Name: </strong>{item.ownerName}<br />
              <strong>Car Company: </strong>{item.carCompany}<br />
              <strong>Car Model: </strong>{item.carModel}<br />
              <strong>Car Type: </strong>{item.carType}<br />
              <strong>Email of Owner: </strong>{item.ownerEmail}<br />
              <strong>Car Number: </strong>{item.carNumber}<br />
              <strong>Price: </strong>{item.price}
            </div>
            {/* Update the button to navigate to ReservationForm */}
            {/* <Link to="/Payments">
              <Button className="booking" variant="primary">Book</Button>
            </Link> */}
            <Link to={{ pathname: "/Payments", state: { data: [item,userEmail] } }}>
                <Button className="booking" variant="primary">Book</Button>
                
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserView;
