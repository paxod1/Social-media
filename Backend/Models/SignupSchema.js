const moongose = require('mongoose')


const UserSechema = new moongose.Schema({
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String},
    ProfilePic:{type:String},
})

module.exports = moongose.model("blog-app-users data", UserSechema)