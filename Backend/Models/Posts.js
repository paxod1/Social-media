
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postImage: { type: String, required: true },
    postBio: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    ProfilePic: { type: String },
    comments: [{
        username: { type: String, required: true },
        text: { type: String, required: true }
    }],
    like: { type: Number, default: 0 }
});

module.exports = mongoose.model('blog-app-posts', postSchema )