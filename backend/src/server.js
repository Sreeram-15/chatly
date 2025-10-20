import express from 'express';
import messagesRoutes from './routes/message.route.js'
import authRoutes from './routes/auth.route.js';
import path from 'path';
import { connectDb } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();
const PORT=ENV.PORT||3000;
const __dirname=path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
// console.log(ENV);
app.listen(PORT,()=>{
    console.log(`hello from server by port ${PORT}`);
    connectDb();
});