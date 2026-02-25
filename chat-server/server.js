const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes')


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use(messageRoutes);
app.use(userRoutes);


// Socket.io connection
io.on('connection', (socket) => {
    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});