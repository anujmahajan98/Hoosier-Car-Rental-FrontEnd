import './forgetPassword.css'
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useRef } from "react";
import { useHistory } from 'react-router-dom';
//import reCAPTCHA from "react-google-recaptcha"

function ForgetPassword() {
    const form = useRef();
    const history = useHistory();
    const uuidv4 = require('uuid');

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [errors, setFormError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [otpToSend, setOtpToSend] = useState(1234);
    const [otp, setOtp] = useState();
    const [verifyError, setVerifyError] = useState(false);
    const NodeCache = require('node-cache');
    const cache = new NodeCache();
    // const nodemailer = require('nodemailer');


    // const random = Math.floor(Math.random() * 9000 + 1000);
    // useEffect(() => { const random = Math.floor(Math.random() * 9000 + 1000);
    //   setOtpToSend(random); }, [])

      const handleEmailBlur = (event) => {
        const emailValue = event.target.value;
        // history.push('/login');
        if(emailValue.length == 0){
            setEmailError("");
            //setFormSubmitted(false);
            return
        }
        if (!isEmailValid(emailValue)) {
          setEmailError("Please enter a valid email address.");
          setFormError(false)
          setFormSubmitted(false);
        } else {
          setEmailError("");
          setEmail(event.target.value);
          // fetch('http://localhost:8000/checkEmailUniqueness', {
          //       method: 'POST',
          //       headers: { 'Content-Type': 'application/json' },
          //       body: JSON.stringify({email})
          //     })
          //     .then(response => response.text())
          //       .then(data => {
          //         console.log(data);
          //         if(data == 'valid'){
          //           setFormSubmitted(false);
          //           setEmailError("This email is not registerd");
          //         }
          //         else{

          //         }
          //       })
          //       .catch(error => {
          //         console.error(error);
          //         alert('data')
          //       });
        }
      };

      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        //email = event.target.email.value;
        alert(email)
        alert(emailError)
        if(email === ""){
            setFormError(true);
            setFormSubmitted(false);
        }
        else{
            setFormError(false);
            if(emailError == ""){
              setFormSubmitted(true);
              event.preventDefault();
              fetch('https://hoosierbackend.azurewebsites.net/checkEmailUniqueness', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
              })
              .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data == 'valid'){
                    setFormSubmitted(false);
                    setEmailError("This email is not registerd");
                  }
                  else{
                    setFormSubmitted(true);
                    setEmailError("");

                  }
                })
                .catch(error => {
                  console.error(error);
                });
              //alert('OTP - ',otpToSend);
             //alert(random);
              // const otpVerify = uuidv4().substr(0, 6);
              // setOtpToSend(random);
              // alert(otpToSend)
              // setOtpToSend(prevOtp => {
              //   return random;
              // });
              // cache.set(email, random, 300);
              // alert('OTP to send- ',otpToSend);
              
              emailjs
                .sendForm(
                  "service_d2hsih5",
                  "template_ici22nu",
                  form.current,
                  "0ojUSxYq1RPFWYL2y"
                )
                .then(
                  (result) => {
                    console.log(result.text);
                  },
                  (error) => {
                    console.log(error.text);
                  }
                );
          
              // event.target.reset();
            }
            
        }
        

      };

      const verifyOTP = (event) => {
        event.preventDefault();
        if(otp === "" || typeof otp === 'undefined'){
          setVerifyError(true)
        }
        else{
          setVerifyError(false)
          // const userOTP = cache.get(email);
          // alert('Cache OTP - ',userOTP)
          // if (userOTP === otp){
          //   alert('OTP Verified')
          //   history.push('/ResetPassword', { data: email });
          //   window.location.reload();
          // }else{
          //   alert('Wrong OTP')
          // }
          if(otp === '1234'){
            alert('OTP Verified')
            history.push('/ResetPassword', { data: email });
            window.location.reload();
          }
        }
      };

    return(
        <div className='main'>
            <div className='sub-main-1'>
                <div className='form-fields'>
                    <form ref={form}>
                        <h4>Please provide the registered mail for password reset</h4>
                        <div className='email-text'>
                            Email
                        </div>
                        <div>
                            <input type="text" name='email' value={email} className="name" onChange={(event) => setEmail(event.target.value)} onBlur={handleEmailBlur}/>
                        </div>
                        <div>
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                        </div>  
                        <div className="resetPass-Button">
                            <button type="submit" class="btn" onClick={(event)=>handleSubmit(event)}>Submit</button>
                        </div>
                        <div>
                            {errors && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Error: Please fill all the fields</span>}
                        </div>
                        <div>
                          <input type="text" name='otpToSend' value={otpToSend} className="name otp-input" />
                        </div>
                     </form>   
                     <form>
                      {formSubmitted && (
                          <div>
                            <h5>Please enter the OTP sent on your registered mail</h5>
                            <div className='otp-text'>
                              OTP
                            </div>
                            <div>
                                <input type="text" name='otp' value={otp} className="name" onChange={(event) => setOtp(event.target.value)} />
                            </div>
                            <div className="verify-otp-Button">
                              <button type="submit" class="btn" onClick={(event)=>verifyOTP(event)}>Verify</button>
                            </div>
                            <div>
                                {verifyError && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Error: Please enter OTP</span>}
                            </div>
                          </div>
                        )} 
                      </form>  
                </div>
            </div>
        </div>

    );

}

export default ForgetPassword;
