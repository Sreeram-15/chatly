import mongoose from 'mongoose';

export const connectDb=async ()=>{
    try{
        const {MONGO_URL}=process.env;
        if(!MONGO_URL){
            throw new Error("MONGO_URI is not set");
        }
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected: ",conn.connection.host);

    }catch(err){
        console.error("Error connecting to MongoDB: ",err);
        process.exit(1);
    }
}
