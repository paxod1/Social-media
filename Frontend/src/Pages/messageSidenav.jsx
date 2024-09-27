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

function SideNav() {
    return (
        <div>
            <div className="message-side-nav">
           
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="active" exact>
                            <MdHomeFilled className='icons'/> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoIosSearch className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <MdOutlineExplore className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <BiMoviePlay className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Message'} activeClassName="active">
                            <TbMessageChatbot className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoMdHeartEmpty className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Profile'}  activeClassName="active">
                           <CgProfile className='icons'/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active">
                            <IoMdMore className='icons'/> 
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideNav