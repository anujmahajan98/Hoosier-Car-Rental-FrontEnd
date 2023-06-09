import './App.css';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import LoginForm from './components/Login/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUpForm from './components/signUp/signUp';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import Footer from './components/footer/Footer';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserView from './components/UserView/UserView';
import AdminView from './components/AdminView/AdminView';
import Chat from './components/chat/chat';
import {BrowserRouter as Router} from "react-router-dom";
import React, { useEffect } from 'react';
import Maps from './components/Maps/Maps';
import OwnerView from './components/OwnerView/OwnerView';
//raja - april 23rd
import Payments from './components/Payments/payments';
import SearchBar from './components/SearchBar/searchBar';
import UserDashboard from './components/userDashboard/UserDashboard.js';
//raja - april 23rd



/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

  const audioContext = new AudioContext();
  audioContext.resume();
  audioContext.suspend();


const App = () => {


  useEffect(() => {
    function handleUserGesture() {
      const audioContext = new AudioContext();
      audioContext.resume();
      audioContext.suspend();
      //Chat.createConversation();
      localStorage.setItem('audioContextInitialized', true);
      document.removeEventListener('click', handleUserGesture);
    }

    const audioContextInitialized = localStorage.getItem('audioContextInitialized');
    if (!audioContextInitialized) {
      document.addEventListener('click', handleUserGesture);
    } else {
      const audioContext = new AudioContext();
      audioContext.resume();
      audioContext.suspend();
      //Chat.createConversation();
    }

    return () => {
      document.removeEventListener('click', handleUserGesture);
    };
  }, []);
  

  return (
    <div>
      
      <BrowserRouter>
      <Router forceRefresh={true}>
        <Navbar currentPage={window.location.pathname} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/forgetPassword" component={ForgetPassword} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="/UserView" component={UserView} />
        <Route path="/AdminView" component={AdminView} />
        <Route path="/maps" component={Maps} />
        <Route path="/OwnerView" component={OwnerView} />
          {/* //raja-april 23rd */}
        <Route path="/Payments" component={Payments}/>
        <Route path="/SearchBar" component={SearchBar}/>
        {/* //raja-april 23rd */}
        {/* raja-april 23rd after meeting */}
        <Route path="/UserDashboard" component={UserDashboard} />
        {/* raja-april 23rd after meeting */}
        <Footer />
        </Router>
        <Chat/>
        
      </BrowserRouter>
      
      {/* <ContactUs/> */}
    </div>
  );
};

export default App;
