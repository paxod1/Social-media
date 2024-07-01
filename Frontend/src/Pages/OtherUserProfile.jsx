import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TokenRequest } from '../AxiosCreate.jsx';
import SideNav from './SideNav.jsx';
import DownNav from './DownNav.jsx';

function OtherUserProfile() {
  const [profile, setProfile] = useState({ username: '', followers: 0, following: 0, ProfilePic: '' });
  const [posts, setPosts] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(null);
  const location = useLocation();
  const { OtherProfileId } = location.state;

  useEffect(() => {
    if (OtherProfileId) {
      getOtherProfile(OtherProfileId);
    }
  }, [OtherProfileId]);

  async function getOtherProfile(userId) {
    try {
      const response = await TokenRequest.get('/home/ProfilePosts', { params: { userId } });
      setProfile(response.data[0]);
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching profile posts:", err);
    }
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
      const updatedPosts = [...posts];
      updatedPosts[index] = updatedPost;

      setPosts(updatedPosts);
      setCurrentComment("");
      setShowCommentInput(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const LikedToPost = async (postId, index) => {
    try {
      const response = await TokenRequest.post(`/home/like/${postId}`);
      const updatedPost = response.data;
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = { ...updatedPosts[index], like: updatedPost.like };
        return updatedPosts;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page">
      <div className='SideNav'>
        <SideNav />
      </div>
      <div className="profile-container">
        <header className="profile-header">
          <div className="profile-pic">
            <img src={profile.ProfilePic ? `/Images/${profile.ProfilePic}` : 'https://via.placeholder.com/150'} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2 className="profile-username">{profile.username || 'Loading...'}</h2>
            <div className="profile-actions">
              <Link  style={{ textDecoration: 'none' }}>
                <button className="profile-edit-btn">Follow</button>
              </Link>
              <Link to={'/Message'}  style={{ textDecoration: 'none' }}>
                <button className="profile-edit-btn">Message</button>
              </Link>
            </div>
          </div>
        </header>
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-number">{posts.length}</span>
            <span className="profile-stat-label">Posts</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">{profile.followers || 0}</span>
            <span className="profile-stat-label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">{profile.following || 0}</span>
            <span className="profile-stat-label">Following</span>
          </div>
        </div>
        <div className="home-profile">
          {posts.length > 0 ? (
            posts.map((data, index) => (
              <div className="home-inner-profile" key={index}>
                <div className="post-profile">
                  <img
                    className="post-image-profile"
                    src={`/Images/${data.postImage}`}
                    alt="Post"
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
  );
}

export default OtherUserProfile;
