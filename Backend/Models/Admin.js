const moongose = require('mongoose')

const AdminSechema = new moongose.Schema({
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = moongose.model("blog-app-admin data", AdminSechema)