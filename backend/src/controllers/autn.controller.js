import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

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
    const user = await User.findOne({ email });
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
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
<<<<<<< HEAD
        profilePic: savedUser.profilePic,
=======
        profilPic: savedUser.profilPic,
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullname,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.log("Failed to send an email:  ", error);
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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
      //never tell the client which one is incorrect email or password
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    // console.log(await isCorrectPassword);
    if (!isCorrectPassword)
      return res.status(404).json({ message: "Invalid credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
<<<<<<< HEAD
      profilePic: user.profilePic,
=======
      profilPic: user.profilePic,
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    });
  } catch (error) {
    // console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const {profilePic}=req.body;
    
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const userId=req.user._id;
    const uploadResponse=await cloudinary.uploader.upload(profilePic,{
      folder: "profile_pictures",
      resource_type: "image",
      transformation: [
        { width: 500, height: 500, crop: "limit" }
      ],
    });
    // const uploadResponse=await cloudinary.uploader.upload(profilePic);

    const updatedUser=await User.findByIdAndUpdate(
      userId,
      {profilePic:uploadResponse.secure_url},
      {new:true}
    );

    res.status(200).json(updatedUser);
  } catch (error) {
      console.log("Error in updating profile:",error);
      res.status(500).json({message:"Internal server error"});
  }
};