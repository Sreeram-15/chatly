import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
  try {
    // console.log("Signup page");
    const { fullname, password, email } = req.body;
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atlesst 6 characters" });
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // console.log("password validated");
    if (!emailregex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({ message: "Email already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    // console.log("salt",salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("hashedPassword",hashedPassword);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
        // console.log(newUser._id);
      const savedUser=await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        profilPic: savedUser.profilPic,
      });
      try{
        await sendWelcomeEmail(savedUser.email,savedUser.fullname,ENV.CLIENT_URL)
      }catch(error){
        console.log("Failed to send an email:  ",error);
      }


    } else {
        res.status(400).json({ message: "Invalid User Data" });
    }
    // res.send("Signup endpoint");
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await User.findOne(email);
    if(!user){
      return res.status(404).json({message:"Invalid credintials"});
      //never tell the client which one is incorrect email or password
    }
  } catch (error) {
    
  }


};

export const Logout = async (req, res) => {
  res.send("Logout logout");
};
