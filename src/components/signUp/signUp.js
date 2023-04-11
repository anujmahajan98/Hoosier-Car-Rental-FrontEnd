import './signUp.css'
import profile from "./../../images/user.jpeg";
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    LoadScript} from "@react-google-maps/api";
import { set } from 'mongoose';
//import email from "./../image/email.jpg";
//import pass from "./../image/pass.png";

const center = { lat: 39.1653, lng: 86.5264 };

function SignUpForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [errors, setFormError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [address, setaddress] = useState('');
    const [location, setLocation] = useState('');
    const [sourceLocation, setSourceLocation] = useState("");
    const [lattitude, setLattitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const history = useHistory();
    const sourceRef = useRef(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDAbR2m3Yesmhels4nOYKtqKG3CxUt2ixw",
        libraries: ["places"],
      });

    const handleUsernameBlur = (event) => {
    const usernameValue = event.target.value;
    if(usernameValue.length == 0){
        setUsernameError("");
        return
    }
    if (!isUsernameValid(usernameValue)) {
        setUsernameError("Username should contain only letters and numbers.");
    } else {
        setUsernameError("");
    }
    };

    const isUsernameValid = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        return usernameRegex.test(username);
    };


      const handleEmailBlur = (event) => {
        const emailValue = event.target.value;
        if(emailValue.length == 0){
            setEmailError("");
            return
        }
        if (!isEmailValid(emailValue)) {
          setEmailError("Please enter a valid email address.");
        } else {
          setEmailError("");
          fetch('https://hoosierbackend.azurewebsites.net/checkEmailUniqueness', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
              })
              .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data == 'invalid'){
                    setEmailError("This email is already registerd");
                  }
                  else{

                  }
                })
                .catch(error => {
                  console.error(error);
                });
        }
      };

      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handlePasswordBlur = (event) => {
        const passwordValue = event.target.value;
        let errorMessages = [];
        if(passwordValue.length == 0){
            setPasswordError("");
            return
        }
        if (passwordValue.length < 8) {
            errorMessages.push("Password should be more than 8 characters.");
        }
        else if (!/[A-Z]/.test(passwordValue)) {
            errorMessages.push("Password should contain at least 1 uppercase letter.");
        }
        else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue)) {
            errorMessages.push("Password should contain at least 1 special character.");
        }

        setPasswordError(errorMessages.join("\n• "));
      };

      const handleConfirmPasswordBlur = (event) => {
        const confirmPasswordValue = event.target.value;
        if(confirmPasswordValue.length == 0){
            setConfirmPasswordError("");
            return
        }
        if (confirmPassword != password){
            setConfirmPasswordError("Password Mismatch");
        }
        else{
            setConfirmPasswordError("");
            return
        }
      };

      const handleRole = (event) => {
        setSelectedOption(event.target.value);
      }

      const handleSecurityQuestion = (event) => {
        setSelectedSecurityQuestion(event.target.value);
      }


      const validateForm = (event) => {
        
        event.preventDefault();
        //const directionsService = new window.google.maps.DirectionsService();
        // console.log(sourceRef.current);
        const sourcePlace = sourceRef.current.getPlace();
        var address = sourcePlace.formatted_address
        var lattitude = sourcePlace.geometry.location.lat()
        var longitude = sourcePlace.geometry.location.lng()
        console.log(address)
        // setaddress(sourcePlace);
        // setSourceLocation(sourcePlace.formatted_address)
        // setLattitude(sourcePlace.geometry.location.lat())
        // setLongitude(sourcePlace.geometry.location.lng())
        console.log(lattitude)
        console.log(longitude)
        //setLocation(origin);
        
        if(email === "" || password === "" || username === "" || confirmPassword === "" || selectedOption === "" || 
        selectedSecurityQuestion === "" || emailError != "" || passwordError != "" || usernameError != "" 
        || confirmPasswordError != "" || securityAnswer === "" || sourcePlace.formatted_address === ""){
            setFormError(true);
        }
        else{
            console.log(emailError)
            setFormError(false);
            fetch('https://hoosierbackend.azurewebsites.net/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, 
                    email, password, selectedOption, selectedSecurityQuestion, 
                    securityAnswer, address, lattitude, longitude})
              })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data === 'valid'){
                    history.push('/login');
                    window.location.reload();
                  }
                //   else{
                //     setloginError(true)
                //   }
                })
                .catch(error => {
                  console.error(error);
                  // handle error here
                });
        }

    // const SubmitRegistration = () =>{

    //     fetch('/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ username, password })
    //       })
    //         .then(response => response.text())
    //         .then(data => {
    //           console.log(data);
    //           // handle response data here
    //         })
    //         .catch(error => {
    //           console.error(error);
    //           // handle error here
    //         });



    //     e.preventDefault()
    //     try{
    //         await axios.post("http://localhost:3000",{username})
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

      };


    //   const getLocation = (event) => {
    //     const sourcePlace = sourceRef.current.getPlace();
    //     setaddress(sourcePlace);
    //     const origin =  sourcePlace.geometry.location;
    //     setLocation(origin);
    //   };
      
      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading maps...";

    return(
        <div className='main'>
            <div className='sub-main'>
                    <div className='form-fields'>
                        <h1>Sign Up</h1>
                        <form>
                            <div className='form-fields1'>
                                <div className='username-text'>
                                    Username
                                </div>
                                <div>
                                    <input type="text" value={username} className="username" onChange={(event) => setUsername(event.target.value)} onBlur={handleUsernameBlur}/>
                                </div>
                                <div className='username-error'>
                                    {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
                                </div>
                                <div className='email-text'>
                                    Email
                                </div>
                                <div>
                                    <input type="text" value={email} className="name" onChange={(event) => setEmail(event.target.value)} onBlur={handleEmailBlur}/>
                                </div>
                                <div className='email-error'>
                                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                                </div> 
                            </div>
                            <div className='form-fields2'>
                                <div className='password-text'>
                                    Password
                                </div>
                                <div className="second-input">
                                    <input type="password" value={password} className="name" onChange={(event) => setPassword(event.target.value)} onBlur={handlePasswordBlur}/>
                                </div>
                                <div className='password-error'>
                                    {passwordError && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>{passwordError}</span>}
                                </div>
                                <div className='confirmPassword-text'>
                                    Confirm Password
                                </div>
                                <div className="confirmPassword-input">
                                    <input type="password" value={confirmPassword} className="name" onChange={(event) => setConfirmPassword(event.target.value)} onBlur={handleConfirmPasswordBlur}/>
                                </div>
                                <div className='confirm-password-error'>
                                    {confirmPasswordError && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>{confirmPasswordError}</span>}
                                </div>
                                <div className='role-text'>
                                    Role
                                </div>
                                <div className='role-input'>
                                    <select type="text" className="role" onChange={handleRole} required>
                                    <option value="">Select role</option>
                                        <option value="Owner">Owner</option>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className='securityQuestion-text'>
                                Security Question
                                </div>
                                <div className='securityQuestion-input'>
                                    <select type="text" className="securityQuestion" onChange={handleSecurityQuestion} required>
                                    <option value="">Select question</option>
                                        <option value="Animal">Your favoutite Animal</option>
                                        <option value="Mother">Your mothers maiden name</option>
                                        <option value="School">Your first school name</option>
                                        <option value="City">Your favourite city</option>
                                    </select>
                                </div>
                                <div className='securityAnswer-text'>
                                    Answer
                                </div>
                                <div className="securityAnswer-input">
                                    <input type="text" className="name" onChange={(event) => setSecurityAnswer(event.target.value)} required/>
                                </div>
                                <div htmlFor="source" className='address-text'>
                                Address
                                </div>
                                <div>
                                    <Autocomplete
                                        onLoad={(autocomplete) => {
                                            sourceRef.current = autocomplete;
                                        }}>
                                        <input
                                            id="source"
                                            type="text"
                                            placeholder="Enter source address"
                                            className="name"
                                        />
                                    </Autocomplete>
                                </div>
                            </div>
                            
                            <div>
                                <div class="register-button">
                                    <button onClick={(event)=>validateForm(event)} type="submit" className="btn">Register</button>
                                </div>
                                <div>
                                    {errors && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Error: Please fill all the fields</span>}
                                </div>
                                
                                <p className="link">
                                    Already have an account ? <a href="/login">Sign In</a>
                                </p>
                            </div>
                        </form>
                    </div>
            </div>
        </div>

    );

}

export default SignUpForm;
