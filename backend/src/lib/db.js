import mongoose from 'mongoose';

export const connectDb=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected: ",conn.connection.host);

    }catch(err){
        console.error("Error connecting to MongoDB: ",err);
        process.exit(1);
    }
}
