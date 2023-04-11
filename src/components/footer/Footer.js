import './Footer.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {

  return (
    <foote>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About Us</h3>
            <p>Here at Hoosier rentals, we provide not just the car rentals but also the ability to rent and lend any product that the customer wants to.</p>
            <p>Contact us: <a href="mailto:hoosierrentals@gmail.com">hooiserrentals@gmail.com</a></p>
          </div>
          <div className="social-media">
              <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>&copy; 2023 My Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </foote>
  );
}

export default Footer;