const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()
app.use(cors())
app.use(express.json());

const UserRouter = require('./Routers/UserRouter')
const AdminRouter = require('./Routers/AdminRouter')

mongoose.connect(process.env.MongoUrl)
    .then(() => {
        console.log("data base is connected")
    }).catch((err) => {
        console.log(err);
    })



app.use('/home', UserRouter)
app.use('/admin', AdminRouter)

app.listen(5001, () => {
    console.log("port is connected")
})