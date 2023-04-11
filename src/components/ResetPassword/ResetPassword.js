import './ResetPassword.css'
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ResetPassword() {
    const form = useRef();
    const history = useHistory();
    const location = useLocation();
    const userEmail = location.state?.data;

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errors, setFormError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [samePassordError, setSamePassordError] = useState(false);
    

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

      const handleSubmit = (event) => {
        event.preventDefault();
        // setPassword(event.target.password.value)
        if(password === ""){
            setFormError(true);
            setFormSubmitted(false);
        }else{
            fetch('https://hoosierbackend.azurewebsites.net/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userEmail, password})
              })
              .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data === 'valid'){
                    alert('Password has been reset !!! Please Login now !!!')
                    history.push('/login');
                    window.location.reload();
                  }
                  else if(data === 'Same Password'){
                    setSamePassordError('Previous and current password cannot be same')
                  }
                  else{
                    // setloginError(true)
                  }
                })
                .catch(error => {
                  console.error(error);
                  // handle error here
                });
        }  

      };

    return(
        <div className='main'>
            <div className='sub-main-1'>
                <div className='form-fields'>
                    <form ref={form}>
                        <h4>Please enter new password</h4>
                        <div className='password-text'>
                            Password
                        </div>
                        <div className="second-input">
                            <input type="password" value={password} name="password" className="name" onChange={(event) => setPassword(event.target.value)} onBlur={handlePasswordBlur}/>
                        </div>
                        <div className='password-error'>
                            {passwordError && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>{passwordError}</span>}
                        </div>
                        <div className='password-error'>
                            {samePassordError && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>{samePassordError}</span>}
                        </div>
                        <div className="resetPass-Button">
                            <button type="submit" class="btn" onClick={(event)=>handleSubmit(event)}>Reset</button>
                        </div>
                        <div>
                            {errors && <span style={{ color: 'red',display: 'block', marginTop: '5px' }}>Error: Please enter the password</span>}
                        </div>
                        {/* <div>
                          <input type="text" name='otpToSend' value={otpToSend} className="name otp-input" />
                        </div> */}
                     </form>   
                     {/* <form>
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
                      </form>   */}
                </div>
            </div>
        </div>

    );

}

export default ResetPassword;
