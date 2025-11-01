import {Server, Socket} from'socket.io';
import http from 'http';
import express from 'express';
import {ENV} from './env.js'
import { socketAuthMiddleware } from '../middleware/socket.auth.middleware.js';

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:[ENV.CLIENT_URL],
        credentials:true,
    }
});
// console.log("recived socket request connect at backend:");
//apply authentication middleware to all socket conections
io.use(socketAuthMiddleware);
// console.log("verifed socket request at backend:");

//we will use this method for checking if the user is online or not
export function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

//this is for storing online users
const userSocketMap={};//{userId:socketId};

io.on("connection",(socket)=>{
    console.log("A user connected",socket.user.fullname);
    const userId=socket.userId;
    userSocketMap[userId]=socket.id;

    //io.emit() is used to send events to all clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //qith socket.on we listen for events on clients
    socket.on("disconnect",()=>{
        console.log("A user got disconnected",socket.user.fullname);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {io,app,server};