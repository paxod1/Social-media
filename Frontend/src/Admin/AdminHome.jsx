import React, { useEffect, useState } from 'react';

import { getallPosts } from '../Pages/Api.js';
import AdminNav from './AdminNav.jsx';
import './AdminHome.css'





function AdminHome() {

    const [allPosts, setAllPosts] = useState({})


    useEffect(() => {
        allposts()

    }, []);
    async function allposts() {
        const posts = await getallPosts()
        console.log("from home all posts>>>>>>>", posts)
        setAllPosts(posts)
    }

    return (
        <>
        <AdminNav/>
            <div className='Admin-main-home'>
                <div className="Admin-home">
                    {allPosts.length > 0 ? (
                        allPosts.map((data, index) => (

                            <div className="Admin-feed">
                                <div className="Admin-post-header">
                                    <img className="Admin-post-avatar" src={`/Images/${data.ProfilePic}`}
                                        alt="avatar"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }} />
                                    <span className="Admin-post-username">{data.username}</span>
                                </div>
                                <div className="Admin-post">
                                    <img className="Admin-post-image" src={`/Images/${data.postImage}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }} alt="post" />
                                    <div className="Admin-post-footer">
                                    
                                        <button className="Admin-like-button">Like</button>
                                        <button className="Admin-comment-button">{data.comment}Comment</button>
                                        <div className="Admin-post-likes">{data.like} likes</div>
                                        <div className="Admin-post-caption"><strong>{data.username}</strong>{data.postBio}</div>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p>Loading....</p>
                    )}

                </div>
            </div>

        </>
    );
}

export default AdminHome;
