import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import './ProfileUpadate.css';
import { useSelector } from 'react-redux';
import { profileView } from './Api';
import { TokenRequest } from '../AxiosCreate';
import { useNavigate } from 'react-router-dom';

function ProfileUpdate() {
    const [profile, setProfile] = useState({});
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const MyData = useSelector((state) => state.userlogin.LoginInfo[0]);
    const ID = MyData ? MyData.id : null;
    const Navigate = useNavigate()

    useEffect(() => {
        if (ID) {
            getProfile(ID);
        }
    }, [ID]);

    async function getProfile(ID) {
        try {
            const MyProfileData = await profileView(ID);
            setProfile(MyProfileData);
            setUsername(MyProfileData.username);
            setFullname(MyProfileData.fullname);
            setEmail(MyProfileData.email);
            setBio(MyProfileData.bio);
            setProfilePic(`/Images/${MyProfileData.ProfilePic}` || null);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setProfilePic(URL.createObjectURL(file));
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('username', username);
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('bio', bio);
        try {
            const response = await TokenRequest.put(`/home/UpdateProfile/${ID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

            });
            console.log('Profile updated successfully:', response.data);
            Navigate('/Profile')
        } catch (error) {
            console.error('Error uploading the image', error);
        }
    };

    return (
        <>
            <SideNav />
            <div>
                <div className="profile-container">
                    <header className="profile-header">
                        <div className="profile-pic">
                            <img src={profilePic || 'https://via.placeholder.com/150'} alt="Profile" />
                            <input type='file' id="fileInput" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="profile-info">
                            <h5>UserName: <input type="text" value={username} style={{ border: 'none' }}
                                onChange={(e) => setUsername(e.target.value)} /></h5>
                            <h5>FullName: <input type="text" value={fullname} style={{ border: 'none' }}
                                onChange={(e) => setFullname(e.target.value)} /></h5>
                            <h5>Email: <input type="text" value={email} style={{ border: 'none' }}
                                onChange={(e) => setEmail(e.target.value)} /></h5>
                            <p style={{ marginTop: "20px" }}>Bio: <input type="text" value={bio}
                                style={{ border: 'none', marginTop: "20px" }}
                                onChange={(e) => setBio(e.target.value)} /></p>
                            <button className="profile-edit-btn" onClick={submitUpdate}>Update</button>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}

export default ProfileUpdate;
