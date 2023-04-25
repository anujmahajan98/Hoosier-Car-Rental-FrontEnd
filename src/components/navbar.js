import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoginForm from './Login/Login';
import './navbar.css'
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";





const Navbar = ({ currentPage }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();
  const location=useLocation();
  const userEmail = location.state?location.state.data:null;
  
  const handleClick = () => {
    // send userEmail to another page
    console.log("Sent data to searchbar on click ->",userEmail)
    history.push('/SearchBar', { data: userEmail });
  };


  return (
    <nav className='navbar'>
        <h1 style={{margin: 0}}>Hoosiers Car Rental</h1>

        {currentPage === '/UserView' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
            <>
              <a href="/" className="nav-link">Home</a>
              <a href="/SearchBar" onClick={handleClick} className="nav-link">Search</a>
              {/* <a href="/dashboard" className="nav-link">Dashboard</a> */}
              <a href="/login" className="nav-link">LogOut</a>
            </>
        </div>
      ) : currentPage === '/OwnerView' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) : currentPage === '/AdminView' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) :
      
      //raja-april 23rd
      
        currentPage === '/SearchBar' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) :
      
      currentPage === '/userDashboard' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href='/SearchBar' onClick={handleClick} className="nav-link">Search</a>
          <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) 
      : 
        currentPage === '/Payments' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
              <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) : 
      //raja-april 23rd
      
      (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="nav-link">Sign Up</a>
        </div>
      )}



        {/* <h1>Owner</h1>
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="nav-link">Sign Up</a>
        </div> */}
      </nav>
    );
};

export default Navbar;
