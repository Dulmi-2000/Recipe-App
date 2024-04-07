import React from 'react'
import './signin.css'
import logo from '../../Assets/logo.png';
import CustomTextField from '../Other/Textfeild';
import { useState,useRef } from 'react';
import CustomButton from '../Other/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [ errMsg, setErrMsg] = useState('');
    const [errPassMsg, setErrPassMsg] = useState('');
    const [ errEmailMsg, setErrEmailMsg] = useState('');

    const maskPassword = (password) => {
        return '*'.repeat(password.length); 
    };
    

      function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

 
      const handleSubmit = async (e) => {
        e.preventDefault();
    
          try {
            
            if (validateEmail(email)) {
             console.log("Valid email address.");
            } else {
                setErrEmailMsg('Invalid email.');
            }
    
            // Check if the email and password are set
            if (!email && !password) {
                setErrMsg('Please enter both email and password.');
                return;
            }
            if (email && !password) {
                setErrPassMsg('Please enter your password.');
                return;
            }
            if (!email && password) {
                setErrEmailMsg('Please enter your email.');
                return;
            }
            
            // Check if the email exists
            const emailResponse = await axios.get(`http://localhost:3006/api/cook-web/GetUserByEmail/${email}`);
            const existingUser = emailResponse.data;

            //console.log(emailResponse.data)
    
            if (!(existingUser)) {
                setErrMsg('User not found. Please sign up.');
                return
            }
            if (existingUser) {
                // User exists, check password
                if (existingUser.password === password) {
                    // Passwords match, navigate to home page
                    navigate("/Home");
                } else {
                    // Incorrect password
                    setErrMsg('Incorrect password. Please try again.');
                }
            
            
            } else {
             
                setErrMsg('User not found. Please sign up.');
            }
        } catch (error) {
            console.error('Error:', error);
            
            setErrMsg('Invalid login.');
        }
    };
    
      
    
  return (
      <div className='signinConatiner'>
          
          <div className='loginFormContainer'>
              
                  <div>
                  <img src={logo} alt='Company Logo' className='loginLogo'></img>
                  </div>
                  <div>
                      <br></br>
                  <div className='topic'>
                      <h3>Login</h3>
                  </div>
                  
                  <br></br>
                  <form className='frm1' >
                      <div>
                          <CustomTextField
                              error={Boolean(errEmailMsg)}
                              label="Email address"
                              value={email}
                              
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrEmailMsg(''); 
                            }}
                              className='inputField'
                              focused
                              helperText={errEmailMsg ? errEmailMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errEmailMsg ? 'red' : '' }} 
                        />
                      </div>
                      <br/><br/>
                      <div>
                      <CustomTextField
                        error={Boolean(errPassMsg)}
                        label="Password"
                        value={maskPassword(password)}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrPassMsg(''); 
                        }}
                        className='inputField'
                        focused
                        helperText={errEmailMsg ? errEmailMsg : ""}
                        id="outlined-error"
                        style={{ borderColor: errPassMsg ? 'red' : '' }} 
                    />

                        
                     </div>

                      <br></br>
                      
                  <div>
                      <br></br>
                  <CustomButton className="custom-button" onClick={handleSubmit}>
                     SIGN IN
                  </CustomButton>
                  {errMsg && (
                  <p className='err'>{errMsg}</p>
                   )}
                      </div>
                      

                  <div className='signinlink'>
                   <p className='p1'>
                       Don't have an account? <Link className='link' to='/Signup/Signup'> Create an account</Link>
                   </p>
                      </div>
                      
               </form>   
              </div>
             
              
          </div> 
          
          </div>
  
  )
}

export default Signin