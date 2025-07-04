const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket= require('socket.io');
const dotenv= require('dotenv');
const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');

dotenv.config();
const app=express();
const PORT= process.env.PORT || 3000;

app.use(cors({
  origin: "https://chatapp-frontend-tmep.onrender.com", 
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
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

const server= app.listen(process.env.PORT,()=>{
    console.log(`Access the server on http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "https://chatapp-frontend-tmep.onrender.com",
    methods: ["GET", "POST"]
  }
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
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
});

io.on("disconnect", () => {
  for (const [userId, sockId] of onlineUsers.entries()) {
    if (sockId === socket.id) {
      onlineUsers.delete(userId);
      break;
    }
  }
});
