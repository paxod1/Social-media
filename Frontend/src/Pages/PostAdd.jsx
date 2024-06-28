import React, { useState, useEffect } from 'react';
import './PostAdd.css';
import SideNav from './SideNav';
import { useSelector } from 'react-redux';
import { TokenRequest } from '../AxiosCreate';
import { useNavigate } from 'react-router-dom';
import { profileView } from './Api';

function PostAdd() {
    const [postImage, setPostImage] = useState(null);
    const [postBio, setPostBio] = useState('');
    const [preview, setPreview] = useState(null);
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState({});
    const Navigate = useNavigate();
    const MyData = useSelector((state) => state.userlogin.LoginInfo[0]);

    useEffect(() => {
        if (MyData) {
            setUserId(MyData.id);
            getProfile(MyData.id)
        }
    }, [MyData]);

    async function getProfile(ID) {
        const MyProfileData = await profileView(ID);
        console.log("from profile>>>>.", MyProfileData);
        setProfile(MyProfileData);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, ProfilePic } = profile;
        const formData = new FormData();
        formData.append('file', postImage);
        formData.append('bio', postBio);
        formData.append('userId', userId);
        formData.append('username', username); // Ensure username is included
        formData.append('ProfilePic', ProfilePic); // Ensure ProfilePic is included

        try {
            await TokenRequest.post('/home/AddPost', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Navigate('/Profile'); // Redirect to profile page after successful post creation
        } catch (error) {
            console.error('Error uploading the post', error);
        }
    };

    return (
        <>
            <SideNav />
            <div className="post-add-container">
                <form onSubmit={handleSubmit} className="post-add-form">
                    <div className="image-upload">
                        <label htmlFor="fileInput" className="image-upload-label">
                            {preview ? (
                                <img src={preview} alt="Preview" className="image-preview" />
                            ) : (
                                <div className="image-upload-placeholder">+</div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleImageChange}
                            className="image-upload-input"
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Write a caption..."
                        value={postBio}
                        onChange={(e) => setPostBio(e.target.value)}
                        className="post-bio-input"
                        required
                    />
                    <button type="submit" className="submit-button">
                        Share
                    </button>
                </form>
            </div>
        </>
    );
}

export default PostAdd;
