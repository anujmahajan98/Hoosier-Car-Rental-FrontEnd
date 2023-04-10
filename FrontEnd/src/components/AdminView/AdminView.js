// import React from "react";
// import './AdminView.css'
// import { Row,Col,Container,Button } from 'react-bootstrap'

// import { useState } from "react";


// function AdminView() {

//   var [userData, setUserData] = useState([]);
//   var [userListAccess, setUserListAccess] = useState(false);
//   var [carListAccess, setCarListAccess] = useState(false);

//       const userList = (event) => {
//         event.preventDefault();
//         fetch('http://localhost:8000/userList', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({})
//         })
//         .then(response => response.text())
//           .then(data => {
//             setUserData(JSON.parse(data));
//             setUserListAccess(true)
//             setCarListAccess(false)
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       };

//     const carList = (event) => {
//       setUserListAccess(false)
//       setCarListAccess(true)
//       fetch('http://localhost:8000/ownerList', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({})
//         })
//         .then(response => response.text())
//           .then(data => {
//             setUserData(JSON.parse(data));
//             setUserListAccess(false)
//             setCarListAccess(true)
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       };

//     return(



//       <>
//       <Container>
//         <Row>
//           <h1 className="text-center bg-dark text-light p-2">ADMIN PANEL</h1>
//           <Col md={4}>
//             <Button onClick={(event) => userList(event)}>All Users</Button>{" "}
//             <Button onClick={(event) => carList(event)}>Add New Car</Button>
//           </Col>
//         </Row>
//         <Row>
//           {userListAccess &&
//             <h1> Users</h1>
//           }
//         </Row>
//         <Row>
//           {userListAccess &&
//           <div className="columns">
//             <div className="column">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Email</th>
//                     <th>Username</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userData &&
//                     userData.slice(0, Math.ceil(userData.length / 2)).map((item) => (
//                       <tr key={item._id}>
//                         <td style={{ border: "1px solid black" }}>{item.email}</td>
//                         <td style={{ border: "1px solid black" }}>
//                           {item.username ? item.username : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="column">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Email</th>
//                     <th>Username</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     userData.slice(Math.ceil(userData.length / 2)).map((item) => (
//                       <tr key={item._id}>
//                         <td style={{ border: "1px solid black" }}>{item.email}</td>
//                         <td style={{ border: "1px solid black" }}>
//                           {item.username ? item.username : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           }
//         </Row>
//       </Container>
//     </>


      
//     )

// }

// export default AdminView;


import React from "react";
import './AdminView.css'
import { Row,Col,Container,Button } from 'react-bootstrap'

import { useState } from "react";


function AdminView() {

  var [userData, setUserData] = useState([]);
  var [carData, setCarData] = useState([]);
  var [userListAccess, setUserListAccess] = useState(false);
  var [carListAccess, setCarListAccess] = useState(false);

      const userList = (event) => {
        fetch('http://localhost:8000/userList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        })
        .then(response => response.text())
          .then(data => {
            
            setUserData(JSON.parse(data));
            console.log(userData)
            setUserListAccess(true)
            setCarListAccess(false)
          })
          .catch(error => {
            console.error(error);
          });
      };

    const carList = (event) => {
      fetch('http://localhost:8000/AddNewCar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        })
        .then(response => response.text())
          .then(data => {
            console.log(data)
            setCarData(JSON.parse(data));
            console.log(carData)
            setCarListAccess(true)
            setUserListAccess(false)
            console.log(carListAccess)
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
              <div>
              <p>Name: {carData[0].carModel}</p>

              </div>
              <table>
                <thead>
                  <tr>
                    <th>Owner Name</th>
                    <th>Car Name</th>
                    <th>Car Type</th>
                  </tr>
                </thead>
                <tbody>
                {/* {carData &&
                    carData.map((item) => (
                      <tr key={item._id}>
                        <td style={{ border: "1px solid black" }}>{item.ownerName ? item.ownerName : "-"}</td>
                        <td style={{ border: "1px solid black" }}>{item.carModel ? item.carModel : "-"}</td>
                        <td style={{ border: "1px solid black" }}>{item.carType ? item.carType : "-"}</td>
                      </tr>
                    ))} */}
                  {carData &&
                  carData.map((item) => (
                    <tr key={item._id}>
                      <td>{carData[0].carModel}</td>
                      <td style={{border : "1px solid black"}}>{item.ownerName ? item.ownerName : "-"}</td>
                      <td style={{border : "1px solid black"}}>{item.carModel ? item.carModel : "-"}</td>
                      <td style={{border : "1px solid black"}}>{item.carType ? item.carType : "-"}</td>
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




