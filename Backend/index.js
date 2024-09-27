const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./Models/Message.js');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS setup
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// MongoDB connection setup
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

// Routes setup
const UserRouter = require('./Routers/UserRouter.js');
const AdminRouter = require('./Routers/AdminRouter.js');
const UserRouterImageAdd = require('./Routers/UserRouterToAddImages.js');
app.use('/Home', UserRouterImageAdd);
app.use('/home', UserRouter);
app.use('/admin', AdminRouter);

// Socket.io setup
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

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
            console.log('Message saved:', newMessage);

            io.to(data.room).emit('chat message', {
                msg: data.msg,
                sender: data.sender,
                timestamp: newMessage.timestamp
            });
        } catch (error) {
            console.error('Error saving message or emitting to room:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Server setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
