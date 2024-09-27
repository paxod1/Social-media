import React from 'react'
import './SideNav.css';
import { Link, NavLink } from 'react-router-dom';
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdMore } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

function SideNav() {
    return (
        <div>
            <div className="side-nav">
           
                <div className="logo"><div className='logo-insta'><FaInstagram /></div> <img className='show-name-insta' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" alt="" /></div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="active" exact>
                            <MdHomeFilled className='icons'/> <div className='title-options'>Home</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoIosSearch className='icons'/><div className='title-options'> Search</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <MdOutlineExplore className='icons'/><div className='title-options'> Explore</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <BiMoviePlay className='icons'/><div className='title-options'>Reels</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Message'} activeClassName="active">
                            <TbMessageChatbot className='icons'/><div className='title-options'>Messages</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoMdHeartEmpty className='icons'/><div className='title-options'> Notifications</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Profile'}  activeClassName="active">
                           <CgProfile className='icons'/><div className='title-options'> Profile</div> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoMdMore className='icons'/> <div className='title-options'>More</div> 
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideNav