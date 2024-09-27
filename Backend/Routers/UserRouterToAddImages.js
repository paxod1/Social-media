const router = require('express').Router();
const posts = require('../Models/Posts');
const upload = require('./Uploads'); 
const UserData = require('../Models/SignupSchema');


router.put('/UpdateProfile/:id', upload.single("file"), async (req, res) => {
    try {
        const existingUser = await UserData.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const updateData = {};
        if (req.body.email) updateData.email = req.body.email;
        if (req.body.fullname) updateData.fullname = req.body.fullname;
        if (req.body.username) updateData.username = req.body.username;
        if (req.body.bio) updateData.bio = req.body.bio;
        if (req.file) {
            updateData.ProfilePic = req.file.path; 
        }
        const updatedUser = await UserData.findByIdAndUpdate(req.params.id, {
            $set: updateData
        }, { new: true });

        if (!updatedUser) {
            return res.status(500).json({ error: "Failed to update user profile" });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Failed to update profile:", err);
        res.status(500).json({ error: "Failed to update profile", err });
    }
});


router.post('/AddPost', upload.single('file'), async (req, res) => {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file); // Log the received file

    try {
        // Check if file and required fields are present
        if (!req.file) {
            console.error("File is missing");
            return res.status(400).json({ error: "File is missing" });
        }
        if (!req.body.userId || !req.body.username || !req.body.bio) {
            console.error("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create a new post with Cloudinary URL directly from req.file
        const newPost = new posts({
            userId: req.body.userId,
            postBio: req.body.bio,
            postImage: req.file.path, // Use the path from the CloudinaryStorage
            username: req.body.username,
            ProfilePic: req.body.ProfilePic || '',
        });

        try {
            const savedPost = await newPost.save();
            res.status(201).json({
                message: 'Post created successfully!',
                post: savedPost,
            });
        } catch (err) {
            console.error("Error saving post:", err);
            res.status(500).json({ error: "Failed to save post", message: err.message });
        }
    } catch (err) {
        console.error("Error adding post:", err);
        res.status(500).json({ error: "Failed to add post", message: err.message });
    }
});


module.exports = router;
