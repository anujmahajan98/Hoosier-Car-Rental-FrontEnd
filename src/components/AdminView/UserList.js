import { render } from "@testing-library/react";
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './UserList.css'


// const UserList = () => {
//    const [data,setData] = useState([])
//    useEffect(() => {fetch('http://localhost:8000/UserList', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//    })
//    .then(response => response.text())
//      .then(data => {
//        console.log(data,"userData");
//        setData(data.data);
//      });
//      .catch(error => {
//      console.error(error);
//      });
//    }, [])

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8000/UserList', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//       setUsers(data);
//     })
//     .catch(error => console.error(error));
//   }, []);

function UserList(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
  //  setUsers(!users);
    fetch('http://localhost:8000/UserList', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      setUsers(data);
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
      
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  );
}

export default UserList;


 //  return (
    //  <Table className="my-table" striped bordered hover>
    //    <thead>
    //      <tr>
    //        <th className="table-header">ID</th>
    //        <th className="table-header">Username</th>
    //        <th className="table-header">E-mail</th>
    //        <th className="table-header">Role</th>
    //      </tr>
    //    </thead>
    //    {/* {data.map(i=>{
    //     return(
    //       <tr>
    //         <td>{i.username}</td>
    //         <td>{i.email}</td>
    //         <td>{i.role}</td>
    //       </tr>
    //     )
    //    })} */}
    //  </Table>
    
    //    );

    // return (
    //   <div>
    //     <h1>User List</h1>
    //     <ul>
    //       {users.map(user => (
    //         <li key={user.id}>{user.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // );