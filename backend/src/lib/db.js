import mongoose from 'mongoose';
import { ENV } from './env';
export const connectDb=async ()=>{
    try{
        const MONGO_URL=ENV.MONGO_URL;
        if(!MONGO_URL){
            throw new Error("MONGO_URI is not set");
        }
        const conn=await mongoose.connect(MONGO_URL);
        console.log("MongoDb connected: ",conn.connection.host);

    }catch(err){
        console.error("Error connecting to MongoDB: ",err);
        process.exit(1);
    }
}
