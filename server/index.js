const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket= require('socket.io');
const dotenv= require('dotenv');
const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');

const port=3000;
dotenv.config();
const app=express();

app.use(cors({
    // origin: "http://localhost:5173",
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth',userRoutes);
app.use('/api/messages',messagesRoute);

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/chats");
    await mongoose.connect(process.env.MONGO_URI);
}

main().then(()=>{
    console.log("Db Initiated...");
}).catch((err)=>{
    console.log(err);
});

const server= app.listen(port,()=>{
    console.log(`Access the server on http://localhost:${port}`);
});

const io= socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});