import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import './Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { profileView } from './Api';
import { Link } from 'react-router-dom';
import { TokenRequest } from '../AxiosCreate';
import DownNav from './DownNav';
import { useNavigate } from 'react-router-dom';
import { LogoutData } from '../Redux/UserSlice';

function Profile() {
  const [profile, setProfile] = useState({});
  const MyData = useSelector((state) => state.userlogin.LoginInfo[0]);
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (MyData && MyData.id) {
      getProfile(MyData.id);
      getProfilePost(MyData.id);
    }
  }, [MyData]);

  async function getProfile(ID) {
    try {
      const MyProfileData = await profileView(ID);
      setProfile(MyProfileData);

      if (MyProfileData.ProfilePic) {
        import(`/Images/${MyProfileData.ProfilePic}`)
          .then(image => setProfilePic(image.default))
          .catch(err => console.log('Error loading profile picture:', err));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  async function getProfilePost(userId) {
    try {
      const dataProfilePost = await TokenRequest.get('/home/ProfilePosts', { params: { userId } });
      setPosts(dataProfilePost.data);
    } catch (err) {
      console.log("Error fetching profile posts:", err);
    }
  }

  async function removePost(PostID) {
    try {
      await TokenRequest.delete(`/home/deleteposts/${PostID}`);
      setPosts(posts.filter(post => post._id !== PostID));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  function logoutUser() {
    dispatch(LogoutData());
    navigate('/login');
  }

  return (
    <div className="profile-page">
      <div className='SideNav'>
        <SideNav />
      </div>
      <div className="profile-container">
        <header className="profile-header">
          <div className="profile-pic">
            <img src={profilePic || 'https://via.placeholder.com/150'} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2 className="profile-username">{profile.username || 'Loading...'}</h2>
            <div className="profile-actions">
              <Link to="/ProfileUpdate" style={{ textDecoration: 'none' }}>
                <button className="profile-edit-btn">Edit Profile</button>
              </Link>
              <Link style={{ textDecoration: 'none' }}>
                <button className="profile-edit-btn" onClick={logoutUser}>Logout</button>
              </Link>
            </div>
            <h3 >{profile.bio || 'Loading...'}</h3>
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
        <Link to="/PostAdd" className="profile-custom-link" style={{ textDecoration: "none" }}>
          <label htmlFor="fileInput" className="profile-custom-file-label">Add Post</label>
        </Link>
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
                  <div className="post-footer-profile">
                    <button className="like-button-profile">Like</button>
                    <button className="comment-button-profile">Comment</button>
                    <button className="comment-button-profile" onClick={() => removePost(data._id)}>Remove</button>
                    <div className="post-likes-profile">{data.likes} likes</div>
                    <div className="post-caption-profile"><strong>{profile.username || 'Loading...'}</strong> {data.postBio}</div>
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

export default Profile;
