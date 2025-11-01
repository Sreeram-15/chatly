import jwt from 'jsonwebtoken';
import {ENV} from './env.js'
export const generateToken=(userId,res)=>{
    const {JWT_SECRET,NODE_ENV}=ENV;
    if(!JWT_SECRET){
        throw new Error("secretkey is not configured");
    }
    // console.log(userId,ENV.JWT_SECRET);
    const token=jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d",
    });
    // console.log(token);
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //MS
        httpOnly:true, //Prevent XSS Attacks:
        sameSite: "strict",
        secure:NODE_ENV==="production"?true:false
    })
    return token;
}
