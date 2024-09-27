import React, { useState } from 'react'
import { addadmin } from './API'
import { useNavigate } from 'react-router-dom';



function AddAdmin() {
    const [email, setEmail] = useState()
    const [fullname, setFullname] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const Navigate = useNavigate()

    async function AddadminClick() {
        try {
            const addedadmiin = await addadmin({ email, fullname, username, password })
            Navigate('/Admin')
        } catch (err) {
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
                    <h2>Add ADMIN</h2>
                    <div className="divider">
                        <div className="line"></div>
                        <div className="or">OR</div>
                        <div className="line"></div>
                    </div>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Email"
                        onChange={((e) => setEmail(e.target.value))}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Full Name"
                        onChange={((e) => setFullname(e.target.value))}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Username"
                        onChange={((e) => setUsername(e.target.value))}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        onChange={((e) => setPassword(e.target.value))}
                    />
                    <button className="signup-button" onClick={AddadminClick}  >ADD</button>
                    <p>
                        By signing up, you agree to our <a href="#">Terms</a> , <a href="#">Data Policy</a> and <a href="#">Cookies Policy</a> .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AddAdmin