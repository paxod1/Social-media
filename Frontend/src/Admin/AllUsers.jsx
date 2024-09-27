import React, { useEffect, useState } from 'react'
import { getallusers } from './API'
import './Allusers.css'
import AdminNav from './AdminNav'
import { useNavigate } from 'react-router-dom';
import { AdminTokenRequest } from '../AxiosCreate';

function AllUsers() {
    const [users, setUsers] = useState({})
    useEffect(() => {
        APIcall()
    }, [])
    async function APIcall() {
        const allusers = await getallusers()
        console.log(allusers)
        setUsers(allusers.data)
    }
    const Navigate = useNavigate()

    async function RemoveUser(id) {
        try {
            const removed=await AdminTokenRequest.delete(`/admin/removeUser/${id}`)
            Navigate('/Admin')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <AdminNav />
            <div className='maindivOfProfiles'>{
                users.length > 0 ? (
                    users.map((item, index) => (
                        <div class="admin-profile-container">
                            <div class="profile-header">
                                <h1><img className='logo-icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" alt="" /></h1>
                            </div>
                            <div class="admin-profile-content">
                                <div class="admin-profile-picture">
                                    <img src={`/Images/${item.ProfilePic}`} alt="" />
                                </div>
                                <div class="profile-details">
                                    <p>Fullname: {item.fullname}</p>
                                    <p>Username: {item.username}</p>
                                    <p>Email: {item.email}</p>
                                    <p><p className='admin-Heading'>Admin can remove User account</p></p>
                                    <button onClick={()=>RemoveUser(item._id)} >Remove Admin</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )
            }</div>
        </div>
    )
}

export default AllUsers