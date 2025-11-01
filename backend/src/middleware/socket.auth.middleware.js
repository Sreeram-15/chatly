import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    //extract token from http-only cookies
    // console.log("verifing user socket");
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized -No token Provided"));
    }

    //verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected:- Invalid Token");
      return next(new Error("Unauthorized -Invalid Token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected:- User not found");
      return new Error("User not found");
    }

    socket.user = user;
    socket.userId = user._id;

    console.log(`Socket Authenticated for user:- ${user.fullname} ${user._id}`);

    next();
  } catch (error) {
    console.log("Error in auth socket connection:-", error.message);
    next(new Error("Unauthorized - Authentication Failed"));
  }
};
