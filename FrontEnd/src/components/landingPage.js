import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/searchBar';
import AboutUs from './aboutUs/aboutUs';
import ContactUs from './contactUs/contactUs';

const LandingPage = () => {
  return (
    <div className='landingMain'>
      <div className='landingImage' style={{
          backgroundImage: `url('https://www.incimages.com/uploaded_files/image/1920x1080/getty_649362670_395940.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div style={{
              textAlign: 'center',
              color: '#fff',
              maxWidth: '500px',
              padding: '30px'
            }}>
            <h1 style={{margin: 0, fontSize: '3em'}}>Welcome to Hoosiers Car Rentals</h1>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div>
          <AboutUs />
      </div>
      <div>
          <ContactUs />
      </div>
      {/* <div className = 'aboutUs'>
        <div className='aboutUsImage'>
          <h1>Hi</h1>
        </div>
        <div className='aboutUsInfo'>
          <h1>Hi</h1>
        </div>
      </div> */}
    </div>
);
};

export default LandingPage;