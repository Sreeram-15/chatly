import jwt from 'jsonwebtoken';
export const generateToken=async (userId,res)=>{
    // console.log(userId,process.env.JWT_SECRET);
    const token=await jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
    // console.log(token);
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //MS
        httpOnly:true, //Prevent XSS Attacks:
        sameSite: "strict",
        secure:process.env.NODE_ENV==="production"?true:false
    })
    return token;
}
