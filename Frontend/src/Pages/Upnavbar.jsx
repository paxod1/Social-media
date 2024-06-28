import React from 'react'
import { Link } from 'react-router-dom';
import './Upnavbar.css';

import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";


function Upnavbar() {
  return (
    <>
      <div className="up-nav-bar">
        <div className="nav-logo">
          <img  className="logo-icon"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" alt="" />
        </div>
        <div className="nav-icons">
          <Link to="/notifications" className="nav-icon">
          <IoIosSearch className='icons' />
          </Link>
          <Link to="/settings" className="nav-icon">
          <IoMdHeartEmpty className='icons' />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Upnavbar