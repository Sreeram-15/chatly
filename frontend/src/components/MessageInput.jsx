<<<<<<< HEAD
import React, { useRef, useState } from "react";
import useKeyBoardSound from "../hooks/useKeyBoardSound.js";
import { useChatStore } from "../store/useChatStore.js";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
=======
import React, { useState } from "react";
import useKeyBoardSound from "../hooks/useKeyBoardSound";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyBoardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
<<<<<<< HEAD
    setImagePreview(null);
=======
    setImagePreview("");
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
<<<<<<< HEAD
    const file = e.target.files?.[0];
=======
    const file = e.target.files[0];
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

<<<<<<< HEAD
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {imagePreview && (
=======
  const removeImage=()=>{
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return <div className="p-4 border-t border-slate-700/50">
        {/*
             {imagePreview && (
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
<<<<<<< HEAD
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
=======

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
<<<<<<< HEAD
          className="flex-1 bg-slate-800/50 border border-slate-800/50 rounded-lg py-2 px-4"
          placeholder="Type your message..."
        />
=======
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
          placeholder="Type your message..."
        />

>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
<<<<<<< HEAD
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4
              transition-colors${imagePreview ? "text-cyan-500" : ""}
              `}
=======

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
            imagePreview ? "text-cyan-500" : ""
          }`}
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
<<<<<<< HEAD
          disabled={!text.trim && !imagePreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 
              font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 
              disabled:cursor-not-allowed"
=======
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
<<<<<<< HEAD
    </div>
  );
=======
        */}

    </div>;
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
};

export default MessageInput;
