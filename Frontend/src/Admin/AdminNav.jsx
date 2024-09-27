import React from 'react'
import { Link } from 'react-router-dom';
import './AdminNav.css';
import { useDispatch } from 'react-redux';
import { LogoutData } from '../Redux/Admin';

function AdminNav() {
  const dispatch = useDispatch()

  function AdminLogout() {
    dispatch(LogoutData())
  }
  return (
    <div className="up-nav-bar">
      <div className="nav-logo">
        <img className="logo-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" alt="" />
        Admin
      </div>
      <div className="nav-icons">
        <Link to="/Admin" className="nav-icon">
          Home
        </Link>
        <Link to="/AllUsers" className="nav-icon">
          All-Users
        </Link>
        <Link to="/AddAdmin" className="nav-icon">
          Add-Admin
        </Link>
        <Link onClick={AdminLogout} className="nav-icon">
          Logout
        </Link>
      </div>
    </div>
  )
}

export default AdminNav