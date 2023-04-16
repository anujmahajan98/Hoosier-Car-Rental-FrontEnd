import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoginForm from './Login/Login';
import './navbar.css'
import { NavLink } from 'react-router-dom';


const Navbar = ({ currentPage }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  return (
    <nav className='navbar'>
        <h1 style={{margin: 0}}>Hoosiers Car Rental</h1>

        {currentPage === '/UserView' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
            <>
              {/* <a href="/dashboard" className="nav-link">Dashboard</a> */}
              <a href="/login" className="nav-link">LogOut</a>
            </>
        </div>
      ) : currentPage === '/OwnerView' ? (
        <div>
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">LogOut</a>
        </div>
      ) : (
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