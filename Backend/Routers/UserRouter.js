const router = require('express').Router();
const UserData = require('../Models/SignupSchema');
const crypto = require('crypto-js');
const JWT = require('jsonwebtoken');
const VerifyToken = require('../VerifyToken');
const multer = require('multer');
const path = require('path');
const posts = require('../Models/Posts');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Frontend/Public/Images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post('/signup', async (req, res) => {
    console.log(req.body);
    req.body.password = crypto.AES.encrypt(req.body.password, process.env.Passkey).toString();
    try {
        const NewUser = new UserData(req.body);
        await NewUser.save();
        res.status(200).json("success");
    } catch (err) {
        console.error("Error during user signup:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const FindUser = await UserData.findOne({ email: req.body.email });
        if (!FindUser) return res.status(401).json('Invalid email or password');

        const bytes = crypto.AES.decrypt(FindUser.password, process.env.Passkey);
        const originalPassword = bytes.toString(crypto.enc.Utf8);

        if (req.body.password !== originalPassword) return res.status(401).json('Invalid email or password');

        const Token = JWT.sign({ id: FindUser._id }, process.env.seckey, { expiresIn: '100d' });
        console.log("token:", Token);
        res.status(200).json({ Token, id: FindUser._id });
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.get('/ProfileData/:id',async (req, res) => {
    console.log("Inside ProfileData Route - Params ID:", req.params.id);
    try {
        const MyProfile = await UserData.findById(req.params.id);
        console.log(MyProfile);
        res.status(200).json(MyProfile);
    } catch (err) {
        console.error(err, "from profileData");
        res.status(500).json("Failed to get data");
    }
});


router.put('/UpdateProfile/:id', VerifyToken, upload.single("file"), async (req, res) => {
    try {
        const existingUser = await UserData.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json("User not found");
        }


        const updateData = {};

        if (req.body.email !== undefined && req.body.email !== '') {
            updateData.email = req.body.email;
        }

        if (req.body.fullname !== undefined && req.body.fullname !== '') {
            updateData.fullname = req.body.fullname;
        }

        if (req.body.username !== undefined && req.body.username !== '') {
            updateData.username = req.body.username;
        }

        if (req.body.bio !== undefined && req.body.bio !== '') {
            updateData.bio = req.body.bio;
        }

        if (req.file) {
            updateData.ProfilePic = req.file.filename;
        }

        const updatedUser = await UserData.findByIdAndUpdate(req.params.id, {
            $set: updateData
        }, { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Failed to update profile:", err);
        res.status(500).json("Failed to update profile");
    }
});


router.post('/AddPost', upload.single('file'), async (req, res) => {
    console.log(req.body);
    try {
        const newPost = new posts({
            userId: req.body.userId,
            postBio: req.body.bio,
            postImage: req.file.filename,
            username: req.body.username,
            ProfilePic: req.body.ProfilePic,
        });
        await newPost.save();
        res.status(200).json("Post added successfully");
    } catch (err) {
        console.error("Error adding post:", err);
        res.status(500).json("Failed to add post");
    }
});
router.get('/ProfilePosts', async (req, res) => {
    const { userId } = req.query;
    console.log("from backend profilePosts>>>..", userId)
    try {
        const data = await posts.find({ userId });
        console.log("from PrfilPosts", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err)
    }
})
router.get('/allPosts', async (req, res) => {
    try {
        const data = await posts.find();
        console.log("from Posts", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err)
    }
})
router.delete('/deleteposts/:id', async (req, res) => {
    console.log("from backend deleteposts>>>>>>>>.", req.params.id)
    const postId = req.params.id;
    try {
        const deletedPost = await posts.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).send({ error: 'Post not found' });
        }
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/comment/:postId', async (req, res) => {
    const { postId } = req.params;
    const { username, text } = req.body;

    if (!username || !text) {
        return res.status(400).json({ error: 'Username and text are required' });
    }

    try {
        const Post = await posts.findById(postId);
        if (!Post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        Post.comments.push({ username, text });
        await Post.save();

        res.status(201).json(Post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/like/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await posts.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.like += 1; 
        await post.save();
        res.status(201).json({ like: post.like }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
