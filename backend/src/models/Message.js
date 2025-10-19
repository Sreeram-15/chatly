import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    SenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    ReciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {timestamps: true}//Created and Updated at
);

const Message=mongoose.model("Message",messageSchema);

export default Message;