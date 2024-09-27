import React, { useState } from 'react'
import './Signup.css';
import { basicRequest } from '../AxiosCreate';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState()
  const [fullname, setFullname] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const Navigate=useNavigate()

 async function callSignupAPI(){
    try{
      const SignupInfo=await basicRequest.post("/home/signup",{email,fullname,username,password})
      Navigate('/')
      console.log("signup sussesed",SignupInfo.data)
  }catch(err){
      console.log(err)
  }
  }
  return (
    <div>
      <div className="signup-container">
        <div className="signup-box">
          <div
            className="signup-logo"

          />
          <h2>Sign up to see photos and videos from your friends.</h2>
          <div className="divider">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <input
            className="signup-input"
            type="text"
            placeholder="Mobile Number or Email"
            onChange={((e) => setEmail(e.target.value))}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Full Name"
            onChange={((e)=>setFullname(e.target.value))}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            onChange={((e)=>setUsername(e.target.value))}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            onChange={((e)=>setPassword(e.target.value))}
          />
          <button className="signup-button" onClick={callSignupAPI} >Sign Up</button>
          <p>
            By signing up, you agree to our <a href="#">Terms</a> , <a href="#">Data Policy</a> and <a href="#">Cookies Policy</a> .
          </p>
        </div>
        <div className="login-box">
          <span>Have an account?</span>
          <a href="#">Log in</a>
        </div>
      </div>
    </div>
  )
}

export default Signup