import './Login.css'
import profile from "./../../images/user.jpeg";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import SearchBar from '../SearchBar/searchBar';
import CheckoutForm from '../CheckoutForm/PaymentForm';
import StripeContainer from '../CheckoutForm/StripeContainer';
import { signInWithGoogle } from "../../Firebase";
import GoogleButton from "react-google-button";
import Cookies from "js-cookie";
import axios from "axios";
/* login page */

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [errors, setFormError] = useState("");
    const [incorrectLogin, setloginError] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [isSignInDisabled, setIsSignInDisabled] = useState(true);


    const history = useHistory();
    
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
        }
      };

      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleRole = (event) => {
        setSelectedRole(event.target.value);
      }

      useEffect(() => {
        setIsSignInDisabled(selectedRole === '');
      }, [selectedRole]);

      const validateForm = (event) => {
        event.preventDefault();
        if(email === "" || password === ""){
            setFormError(true);
        }
        else{
            setFormError(false);
            fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password })
              })
              .then(response => response.json())
                .then(data => {
                  console.log(data)
                  console.log(data.length)
                  if(data.length > 0)
                  {
                    if(data[0].password === password)
                    {
                      
                      if(data[0].role === 'Admin')
                      {
                        history.push('/AdminView', { data: data[0].email });
                        window.location.reload();
                      }
                      else if(data[0].role === 'Owner')
                      {
                        history.push('/UserView', { data: data[0].email });
                        window.location.reload();
                      }
                      else
                      {
                        history.push('/UserView', { data: data[0].email });
                        window.location.reload();
                      }


                    }else{
                      setloginError(true);
                    }
                    
                  }else{
                    setloginError(true);
                  }
                })
                .catch(error => {
                  console.error(error);
                  // handle error here
                });
        }
      };


      const signInWithGoogleOauth = async () => {
        try {
          let data = await signInWithGoogle();
          let idToken = await data.user.getIdToken();
          var email = data.user.reloadUserInfo.email
          try {
            let { data } = await axios.post(
              "http://localhost:8000/signup",
              {
                email: email,
                selectedOption: selectedRole
              },
              {
                headers: {
                  Authorization: "Bearer " + idToken,
                },
              }
            );
            if (data) {
              history.push("/UserView", { data: email });
              window.location.reload();
            }
          } catch (e) {
            console.log(e);
          }
        } catch (error) {
          alert(error);
        }
      };

    return(
        <div className='main'>
            <div className='sub-main'>
            {/* <StripeContainer /> */}
                <div className='form-fields'>
                    {/* <div className="imgs">
                        <div className="container-image">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div> */}
                    
                    
          
                    <div>
                        <h1>Sign In</h1>
                        <div className='email-text'>
                            Email
                        </div>
                        <div>
                            <input type="text" value={email} className="name" onChange={(event) => setEmail(event.target.value)} onBlur={handleEmailBlur}/>
                        </div>
                        <div>
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                        </div>  
                        <div className='password-text'>
                            Password
                        </div>
                        <div className="second-input">
                            <input type="password" className="name" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="login-button">
                        <button onClick={(event)=>validateForm(event)} type="submit" class="btn">Login</button>
                        </div>

                        <div>
                            {errors && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Error: Please fill all the fields</span>}
                        </div>
                        <div>
                            {incorrectLogin && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Email or Password you have entered is not correct</span>}
                        </div>
                        
                            <p className="link">
                            <a href="/forgetPassword">Forgot password ?</a> Or New User <a href="/signup">Sign Up</a>
                            </p>
                        
                    </div>
                    <div>
                      <select type="text" className="role" onChange={(event) => handleRole(event)} required>
                        <option value="">Select role</option>
                        <option value="Owner">Owner</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <GoogleButton
                        onClick={() => signInWithGoogleOauth()}
                        alt="google signin"
                        disabled={isSignInDisabled}
                        style={{marginLeft:'45px', marginTop:'25px'}}
                      />
                    </div>
                    {/* <div>
                      <button class="login-with-google-btn" onClick={signInWithGoogle} type="submit">Sign in with Google</button>
                    </div> */}
                </div> 
            </div>
            

        </div>

    );

}

export default LoginForm;