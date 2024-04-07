import React, { useState } from 'react';
import logo from '../../Assets/logo.png'
import './signup.css'
import CustomTextField from '../Other/Textfeild';
import CustomButton from '../Other/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phn, setPhn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [errFNameMsg, setErrFNameMsg] = useState('');
    const [errLNameMsg, setErrLNameMsg] = useState('');
    const [errEmailMsg, setEmailErrMsg] = useState('');
    const [errPhnMsg, setErrPhnMsg] = useState('');
    const [errPassMsg, setErrPassMsg] = useState('');
    const [errCPassMsg, setErrCPassMsg] = useState('');

    const navigate = useNavigate();


    const maskPassword = (password) => {
        return '*'.repeat(password.length);
    };
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
  }
  
  function validatePhoneNumber(phn) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phn);
}


const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
   
      setErrFNameMsg("");
      setErrLNameMsg("");
      setEmailErrMsg("");
      setErrPhnMsg("");
      setErrPassMsg("");
      setErrCPassMsg("");
      setErrorMsg("");

      // Validate form inputs
      if (!firstName) {
          setErrFNameMsg("Please enter first name");
          return;
      }
      if (!lastName) {
          setErrLNameMsg("Please enter last name");
          return;
      }
      if (!email) {
          setEmailErrMsg("Please enter email");
          return;
      }
      if (!phn) {
          setErrPhnMsg("Please enter phone number");
          return;
      }
      if (validatePhoneNumber(phn)) {
          console.log('Phone number is valid');
      } else {
          console.log('Phone number is invalid');
      }
      if (!password) {
          setErrPassMsg("Please enter password");
          return;
      }
      if (!confirmPassword) {
          setErrCPassMsg("Please confirm password");
          return;
      }

      // Check if email is valid
      if (!validateEmail(email)) {
          setEmailErrMsg('Invalid email.');
          return;
      }

      // Check  passwords match
      if (password !== confirmPassword) {
          setErrCPassMsg("Passwords do not match");
          return;
      }

      // allow signup
      const response = await axios.post("http://localhost:3006/api/cook-web/AddUser", {
          fname: firstName,
          lname: lastName,
          email: email,
          phn: phn,
          password: password
      });

      // console.log("Response:", response.data);
      navigate("/Signin/Signin");
  } catch (error) {
     
      if (error.response && error.response.status === 400) {
       
          setErrorMsg(error.response.data.error);
      } else {
      
          console.error('Error:', error);
          setErrorMsg('Failed to sign up. Please try again.');
      }
  }
};

  

    
    

    return (
      <div className='signupConatiner'>
          <form className='FormContainer'>
          
                <div>
            <img src={logo} alt='Company Logo' className='formLogo'></img>
              </div>
              
              

                <div className='frm2'>

                <div className='heading'>
                  <h3>Register</h3>
                </div>
                <br></br>

                <div className='inputRow'>
                  <div>
                            <CustomTextField
                              error={Boolean(errFNameMsg)}
                              label="Your name "
                              placeholder='First name'
                              value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setErrFNameMsg(''); 
                                }}
                              className='inputFeild1'
                              focused
                              required
                              helperText={errFNameMsg ? errFNameMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errFNameMsg ? 'red' : '' }} 
                        />
                      </div>
                      
                      <div>
                        <CustomTextField
                              error={Boolean(errLNameMsg)}
                              placeholder='Last name'
                              value={lastName}
                              onChange={(e) => {
                                setLastName(e.target.value);
                                setErrLNameMsg(''); 
                            }}
                              className='inputField1'
                              focused
                              required
                              helperText={errLNameMsg ? errLNameMsg : ""}
                              id="outlined-error"
                              style={{  borderColor: errLNameMsg ? 'red' : '' }} 
                        />

                        </div>
                    </div>


                    <br></br>

                    <div className='inputRow'>
                  <div>
                            <CustomTextField
                              error={Boolean(errEmailMsg)}
                              label="Email "
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailErrMsg(''); 
                            }}
                              className='inputField1'
                              focused
                              required
                              helperText={errEmailMsg ? errEmailMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errEmailMsg ? 'red' : '' }} 
                        />
                      </div>
                      
                      <div>
                         
                            <CustomTextField
                              error={Boolean(errPhnMsg)}
                              label="Phone number"
                              value={phn}
                              onChange={(e) => {
                                setPhn(e.target.value);
                                setErrPhnMsg(''); 
                            }}
                              className='inputField1'
                              focused
                              required
                              helperText={errPhnMsg ? errPhnMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errPhnMsg ? 'red' : '' }} 
                        />
                     </div>
                    </div>
                    <br/>
                    
                  <div className='inputRow'>
                  <div>
                            <CustomTextField
                              error={Boolean(errPassMsg)}
                              label="Password "
                              value={maskPassword(password)}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setErrPassMsg(''); 
                            }}
                              className='inputField1'
                              focused
                              required
                              helperText={errPassMsg ? errPassMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errPassMsg ? 'red' : '' }} 
                        />
                      </div>
                      
                      <div>
                      <CustomTextField
                              error={Boolean(errCPassMsg)}
                              label="Confirm Password "
                              value={maskPassword(confirmPassword)}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrCPassMsg(''); 
                            }}
                              className='inputField1'
                              focused
                              required
                              helperText={errCPassMsg ? errCPassMsg : ""}
                              id="outlined-error"
                              style={{ borderColor: errCPassMsg ? 'red' : '' }} 
                        />
                     </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='btnContainer'>
                    <CustomButton className="custom-button1" onClick={handleFormSubmit}>
                     Create Account
                        </CustomButton>
                        
                        <br />
                {/* {errorMsg && (
                  <p style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</p>
                )} */}
                <br />
                    </div>
                    </div>
                  <div className='signinlink'>
                   <p className='p1'>
                       Already an account? <Link className='link' to='/Signin/Signin'> Login</Link>
                   </p>
             
              </div>
          </form>
          
    </div>
  )
}

export default Signup