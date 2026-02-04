import { Types } from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
<<<<<<< HEAD
import { getRecieverSocketId, io } from "../lib/socket.js";
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log("Error in getting Contacts:-", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          reciverId: userToChatId,
        },
        {
          senderId: userToChatId,
          reciverId: myId,
        },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in Message Controllers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: reciverId } = req.params;
    const { text, image } = req.body;
    if(!(text||image)){
        return res.status(400).json({message:"text or image is required"})
    }
    if(senderId.equals(reciverId)){
        return res.status(400).json({message:"Cannot send Message to yourself"});
    }
<<<<<<< HEAD
    const reciverExists=await User.findOne({_id:reciverId});
=======
    const reciverExists=await User.find({_id:reciverId});
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    if(!reciverExists){
        return res.status(404).json({message:"Reciver Not found"});
    }
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });
    // console.log("sending message securely");
    await newMessage.save();
<<<<<<< HEAD

    //todo:send message in realtime if user is in online through socket.io
    const recieverSocketId=getRecieverSocketId(reciverId);
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessages",newMessage);
    }
=======
    //todo:send message in realtime if user is in online through socket.io
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Send Controller:-", error);
<<<<<<< HEAD
    res.status(500).json({ message: "Internal Server Error" });
=======
    res.status(505).json({ message: "Internal Server Error" });
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // console.log("fetching messages please wait for a while");
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { reciverId: loggedInUserId }],
    });
    const chatPartnerIds =[
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()? msg.reciverId.toString(): msg.senderId.toString()
        )
      ),
    ];
    // .map((id)=>new Types.ObjectId(id));
    // console.log(messages);
    const chatPartnerNames=await User.find(
        {_id
            :{$in:(chatPartnerIds)}
        } 
    ).select("-password");
    // console.log(chatPartnerNames);
    return res.status(200).json(chatPartnerNames);
  } catch (error) {
    console.log("Error at fetching chatPartners Endpoint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
