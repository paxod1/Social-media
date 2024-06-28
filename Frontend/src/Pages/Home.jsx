import React, { useEffect, useState } from 'react';
import './Home.css';
import SideNav from './SideNav';
import { useSelector } from 'react-redux';
import { getallPosts, profileView } from './Api';
import DownNav from './DownNav';
import Upnavbar from './Upnavbar';
import Storys from './Storys.jsx';
import { TokenRequest } from '../AxiosCreate.jsx';
import OtherUserProfile from './OtherUserProfile.jsx';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [profile, setProfile] = useState({});
  const MyData = useSelector((state) => state.userlogin.LoginInfo[0]);
  const [allPosts, setAllPosts] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  let ID = null;
  const Navigate = useNavigate()
  if (MyData) {
    ID = MyData.id;
  }

  useEffect(() => {
    getProfile(ID);
    allposts();
  }, [ID]);

  async function getProfile(ID) {
    try {
      const MyProfileData = await profileView(ID);
      console.log("Profile data:", MyProfileData);
      setProfile(MyProfileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  async function allposts() {
    const posts = await getallPosts();
    console.log("from home all posts>>>>>>>", posts);
    setAllPosts(posts);
  }

  const handleCommentInput = (index) => {
    setShowCommentInput(showCommentInput === index ? null : index);
  };

  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleCommentSubmit = async (index, postId) => {
    if (!currentComment.trim()) return;

    try {
      const response = await TokenRequest.post(`/home/comment/${postId}`, {
        username: profile.username,
        text: currentComment,
      });

      const updatedPost = response.data;
      const updatedPosts = [...allPosts];
      updatedPosts[index] = updatedPost;

      setAllPosts(updatedPosts);
      setCurrentComment("");
      setShowCommentInput(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const openOtherProfile = (OtherProfileId) => {
    Navigate('/OtherUserProfile', { state: { OtherProfileId } });
  };

  async function LikedToPost(Postid, index) {
    try {
      const response = await TokenRequest.post(`/home/like/${Postid}`);
      const updatedPost = response.data;
      setAllPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = { ...updatedPosts[index], like: updatedPost.like };
        return updatedPosts;
      });
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      <div className='main-home'>
        <div className='main-25'>
          <div className='friends-suggestion'>
            <div className="post-header">
              <img className="post-avatar" src={`/Images/${profile.ProfilePic}` || 'https://via.placeholder.com/150'} alt="avatar" />
              <span className="post-username">{profile?.username || 'Loading...'}</span>
            </div>
            <div style={{ color: "GrayText" }}>Suggested for you</div>
            <div className="post-header">
              <img className="post-avatar" src="https://via.placeholder.com/50" alt="avatar" />
              <span className="post-username">username</span>
            </div>
          </div>
        </div>
        <div className='main-75'>
          <div className='Upnavbar-small-screen'><Upnavbar /></div>
          <div className='SideNav'>
            <SideNav />
          </div>
          <div className='stories-wrapper'>
            <Storys />
          </div>
          <div className="home">
            {allPosts.length > 0 ? (
              allPosts.map((data, index) => (
                <div className="feed" key={index}>
                  <div className="post-header"onClick={() => openOtherProfile(data.userId)}>
                    <img
                      
                      className="post-avatar"
                      src={`/Images/${data.ProfilePic}`}
                      alt="avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <span className="post-username">{data.username}</span>
                    <h6 className='sethover'>click to see there profile</h6>
                  </div>
                  <div className="post">
                    <img
                      className="post-image"
                      src={`/Images/${data.postImage}`}
                      alt="post"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="post-footer">
                      <button className="like-button" onClick={() => LikedToPost(data._id, index)}>Like</button>
                      <button className="comment-button" onClick={() => handleCommentInput(index)}>
                        Comment
                      </button>
                      <div className="post-likes">{data.like} likes</div>
                      <div className="post-caption">
                        <strong>{data.username}</strong> {data.postBio}
                      </div>
                      {showCommentInput === index && (
                        <div className="comment-input-section">
                          <input
                            type="text"
                            value={currentComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                          />
                          <button onClick={() => handleCommentSubmit(index, data._id)}>Post</button>
                        </div>
                      )}
                      <div className="post-comments">
                        {data.comments && data.comments.slice(-1).map((comment, idx) => (
                          <div key={idx} className="comment">
                            <strong>{comment.username}</strong> {comment.text}
                          </div>
                        ))}
                        {showCommentInput === index && (
                          <div>
                            {data.comments && data.comments.slice(0, data.comments.length - 1).map((comment, idx) => (
                              <div key={idx} className="comment">
                                <strong>{comment.username}</strong> {comment.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading....</p>
            )}
          </div>
          <div className='DownNav'>
            <DownNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;




