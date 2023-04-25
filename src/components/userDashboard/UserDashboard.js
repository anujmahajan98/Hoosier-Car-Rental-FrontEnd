// import React from 'react';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// function UserDashboard(props) {
//   const history = useHistory();
//   const location = useLocation();
//   const docs = props.location.state.data;
//   return (
//     <div className='booking-list'>
//       <h1>Your Booking history</h1>
//       {docs.map(item => (
//         <div key={item.id} className="booking-item" style={{ border: '1px solid #ccc',
//           borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ flex: '1' }}>
//               <strong>Owner Name: </strong>{item.ownerName}<br />
//               <strong>Email of Owner: </strong>{item.ownerEmail}<br />
//               <strong>Car Company: </strong>{item.carCompany}<br />
//               <strong>Car Type: </strong>{item.carType}<br />
//               <strong>Car Model: </strong>{item.carModel}<br />
//               <strong>Car Number: </strong>{item.carNumber}<br />
//               <strong>Price: </strong>{item.price}<br />
//               {/* <strong>Payment ID: </strong>{item.PaymentId}<br /> */}
//               {/* <strong>Payment Date: </strong>{item.paymentDate} */}
//               <strong>Payment Date: </strong>{item.paymentDate.toString().substring(0, 10)}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UserDashboard;


import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function UserDashboard(props) {
  const history = useHistory();
  const location = useLocation();
  const docs = props.location.state.data;

  // useEffect(() => {
  //   // Send userEmail to another page here
  //   history.push('/SearchBar', { data: location.state.userEmail });
  //   console.log("user dashboard email ->",location.state.userEmail)
  // }, []);

  return (
    <div className='booking-list'>
      <h1>Your Booking history</h1>
      {docs.map(item => (
        <div key={item.id} className="booking-item" style={{ border: '1px solid #ccc',
          borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1' }}>
              <strong>Owner Name: </strong>{item.ownerName}<br />
              <strong>Email of Owner: </strong>{item.ownerEmail}<br />
              <strong>Car Company: </strong>{item.carCompany}<br />
              <strong>Car Type: </strong>{item.carType}<br />
              <strong>Car Model: </strong>{item.carModel}<br />
              <strong>Car Number: </strong>{item.carNumber}<br />
              <strong>Price: </strong>{item.price}<br />
              <strong>Payment Date: </strong>{item.paymentDate.toString().substring(0, 10)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
