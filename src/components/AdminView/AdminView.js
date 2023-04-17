import React from "react";
import './AdminView.css'
import { Row,Col,Container,Button } from 'react-bootstrap'

import { useState } from "react";

import handleApprove from './AddNewCar.js'
import handleReject from './AddNewCar.js'

function AdminView() {

  var [userData, setUserData] = useState([]);
  var [carData, setCarData] = useState([]);
  var [userListAccess, setUserListAccess] = useState(false);
  var [carListAccess, setCarListAccess] = useState(false);

      const userList = (event) => {
        event.preventDefault();
        fetch('https://hoosierbackend.azurewebsites.net/userList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        })
        .then(response => response.text())
          .then(data => {
            setUserData(JSON.parse(data));
            setUserListAccess(true)
            setCarListAccess(false)
          })
          .catch(error => {
            console.error(error);
          });
      };

    const carList = (event) => {
      event.preventDefault();
      //setUserListAccess(false)
     //setCarListAccess(true)
      fetch('https://hoosierbackend.azurewebsites.net/AddNewCar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        })
        .then(response => response.text())
          .then(data => {
            console.log(data)
            setCarData(JSON.parse(data));
            console.log(carData)
            setUserListAccess(false)
            setCarListAccess(true)
            console.log(carListAccess)
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    const handleApprove = (id, carNumber) => {
      fetch(`https://hoosierbackend.azurewebsites.net/approveCar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({_id: id, carNumber: carNumber})
  })
  .then(response => response.text())
  .then(data => {
    console.log(`Car with id ${id} has been approved`);
    // Update the carData state to remove the car that was approved
    
    setCarData(prevCarData => prevCarData.filter(car => car._id !== id));
    console.log(`Here`)
  })
  .catch(error => {
    console.error(error);
  });
    };

    const handleReject = (id, carNumber) => {
      fetch(`https://hoosierbackend.azurewebsites.net/rejectCar/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({_id: id, carNumber: carNumber})
  })
  .then(response => response.text())
  .then(data => {
    console.log(`Car with id ${id} has been rejected`);
    // handle the response data here, such as updating the UI to reflect the rejected car
    setCarData(prevCarData => prevCarData.filter(car => car._id !== id));
    console.log(`Here`)
  })
  .catch(error => {
    console.error(error);
  });
    };

    return(



      <Container>
        <Row>
          <h1 className="text-center bg-dark text-light p-2">ADMIN PANEL</h1>
          <Col md={4}>
            <Button onClick={(event) => userList(event)}>All Users</Button>{" "}
            <Button onClick={(event) => carList(event)}>Add New Car</Button>
          </Col>
        </Row>
        <Row>
          {userListAccess &&
            <h1> Users</h1>
          }
        </Row>
        <Row>
          {userListAccess &&
          <div className="columns">
            <div className="column">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userData &&
                    userData.map((item) => (
                      <tr key={item._id}>
                        <td style={{ border: "1px solid black" }}>{item.email}</td>
                        <td style={{ border: "1px solid black" }}>{item.username ? item.username : "-"}</td>
                        <td style={{ border: "1px solid black" }}>{item.role ? item.role : "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          }
        </Row>
        <Row>
          {carListAccess &&
          <h1>Cars List</h1>
          }
        </Row>
        <Row>
          {carListAccess &&
          <div className="columns">
            <div className="column">
              <table>
                <thead>
                  <tr>
                    <th>  Owner Name  </th>
                    <th>  Car Company  </th>
                    <th>  Car Type  </th>
                    <th>  Approve  </th>
                    <th>  Reject  </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  carData.map((item) => (
                    <tr key={item._id}>
                      <td style={{border : "1px solid black"}}>{item.ownerName ? item.ownerName : "-"}</td>
                      <td style={{border : "1px solid black"}}>{item.carCompany ? item.carCompany : "-"}</td>
                      <td style={{border : "1px solid black"}}>{item.carType ? item.carType : "-"}</td>
                      <td style={{border : "1px solid black"}}>
                  <Button variant="success" onClick={() => handleApprove(item._id, item.carNumber)}>Approve</Button>
                </td>
                <td style={{border : "1px solid black"}}>
                  <Button variant="danger" onClick={() => handleReject(item._id, item.carNumber)}>Reject</Button>
                </td>
                    </tr> 
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          }
        </Row>
      </Container>
  


      
    )

}

export default AdminView;



