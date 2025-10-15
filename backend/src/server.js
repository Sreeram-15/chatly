import express from 'express';
import dotenv from 'dotenv';
import messagesRoutes from '../routes/message.route.js';
import authRoutes from '../routes/auth.route.js';
import path from 'path';
import { connectDb } from './lib/db.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT||3000;
const __dirname=path.resolve();

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
// console.log(process.env);
app.listen(PORT,()=>{
    console.log(`hello from server by port ${PORT}`);
    connectDb();
});