import { createElement, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Home from './Pages/Home.jsx'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile.jsx'
import ProfileUpdate from './Pages/ProfileUpdate.jsx'
import PostAdd from './Pages/PostAdd.jsx'
import LoginAdmin from './Admin/LoginAdmin.jsx'
import AdminHome from './Admin/AdminHome.jsx'
import AllUsers from './Admin/AllUsers.jsx'
import AddAdmin from './Admin/AddAdmin.jsx'
import OtherUserProfile from './Pages/OtherUserProfile.jsx'
import Message from './Pages/Message.jsx'


function App() {

  const logininfom = useSelector((state) => state.userlogin?.LoginInfo[0]);
  console.log("from app.js logininfom", logininfom);

  const Adminlogininfom = useSelector((state) => state.adminLogin?.LoginInfo[0]);

  const token = logininfom?.Token;
  const admintoken=Adminlogininfom?.Token

  const app = createBrowserRouter([
    {
      path: "/",
      element:token?<Home/>:<Login/>
    },
    {
      path: "/Signup",
      element: <Signup />
    },
    {
      path: "/Profile",
      element:token?<Profile/>:<Login/>
    },
    {
      path: "/ProfileUpdate",
      element:token?<ProfileUpdate/>:<Login/>
    },
    {
      path: "/PostAdd",
      element:token?<PostAdd/>:<Login/>
    },
    {
      path: "/Admin",
      element:admintoken?<AdminHome/>:<LoginAdmin/>
    },
    {
      path: "/AllUsers",
      element:admintoken?< AllUsers/>:<LoginAdmin/>
    },
    {
      path: "/AddAdmin",
      element:admintoken?< AddAdmin/>:<LoginAdmin/>
    },
    {
      path: "/OtherUserProfile",
      element:token?<OtherUserProfile/>:<Login/>
    },
    {
      path: "/Message",
      element:token?<Message/>:<Login/>
    },
  ])
  
  return (
    <>
      <RouterProvider router={app} />
    </>
  )
}

export default App
