import React from 'react'
import { Link } from 'react-router-dom';
import './DownNav.css';
import { MdHomeFilled } from "react-icons/md";

import { CgProfile } from 'react-icons/cg';
import { BiMoviePlay } from 'react-icons/bi';
import { TbMessageChatbot } from 'react-icons/tb';

function DownNav() {
    return (
        <div>
            <div className="down-nav">
                <Link to={'/'}  className="nav-item">
                    <MdHomeFilled className='icons' />
                </Link>
               
                <Link to="/add" className="nav-item">
                    <BiMoviePlay className='icons' />
                </Link>
             
                <Link to={'/Message'}  className="nav-item">

                    <TbMessageChatbot className='icons' />
                </Link>
                <Link to="/profile" className="nav-item">
                    <CgProfile className='icons' />

                </Link>
            </div>
        </div>
    )
}

export default DownNav