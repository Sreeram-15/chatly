import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log(req);
    // console.log(req.cookies);
    // console.log(req.cookies.jwt)
    if (!token) {
      console.log("Unauthorized- No token provided");
      return res
        .status(401)
        .json({ message: "Unauthorized - Please login to update profile" });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    // if(!decoded){
    //     console.log("Unauthorized- Invalid token");
    //     return res.status(401).json({message:"Unauthorized - Please login again to update profile"});
    // }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
