const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./Models/Message.js');

dotenv.config();
app.use(cors());
app.use(express.json());

const UserRouter = require('./routers/UserRouter');
const AdminRouter = require('./routers/AdminRouter');

mongoose.connect(process.env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database is connected");
})
.catch((err) => {
    console.error("Error connecting to database:", err);
});

app.use('/home', UserRouter);
app.use('/admin', AdminRouter);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Ensure this matches your frontend URL
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', async (room) => {
        try {
            socket.join(room);
            console.log(`User joined room: ${room}`);

            // Retrieve messages only for the current room
            const messages = await Message.find({ room });
            socket.emit('roomMessages', messages);
        } catch (error) {
            console.error('Error joining room or fetching messages:', error);
        }
    });

    socket.on('chat message', async (data) => {
        try {
            const newMessage = new Message({
                room: data.room,
                sender: data.sender,
                text: data.msg
            });

            await newMessage.save();

            io.to(data.room).emit('chat message', { msg: data.msg, sender: data.sender, timestamp: newMessage.timestamp });
        } catch (error) {
            console.error('Error saving message or emitting to room:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
