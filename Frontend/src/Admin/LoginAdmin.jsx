import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginAdmin } from './API';


function LoginAdmin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()

    function APIcallLogin() {
        loginAdmin({ email, password },dispatch)
    }

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <div className="login-logo">
                    
                    </div>
                    Admin Login
                    <input
                        className="login-input"
                        type="text"
                        placeholder="email"
                        onChange={((e) => setEmail(e.target.value))}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        onChange={((e) => setPassword(e.target.value))}
                    />
                    <button className="login-button" onClick={APIcallLogin}>Log In</button>


                </div>

            </div>
        </>
    )
}

export default LoginAdmin
