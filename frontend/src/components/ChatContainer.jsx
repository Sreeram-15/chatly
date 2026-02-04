<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
=======
import React, { useEffect } from "react";
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
const ChatContainer = () => {
<<<<<<< HEAD
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessageLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    // console.log(subscribeToMessages);
    //clean up
    return ()=>unsubscribeFromMessages();
  }, [
    getMessagesByUserId,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
=======
  const { selectedUser, getMessagesByUserId, messages, isMessageLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [getMessagesByUserId, selectedUser]);
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 ">
<<<<<<< HEAD
        {messages.length > 0 && !isMessagesLoading ? (
=======
        {messages.length > 0 && !isMessageLoading ? (
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
<<<<<<< HEAD
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
=======
                    {new Date(msg.createdAt).toISOString().slice(11, 16)}
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
                  </p>
                </div>
              </div>
            ))}
<<<<<<< HEAD
            {/* Scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessageLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullname} />
        )}
        {/* con */}
        {/* {console.log("about to paint messageInput component")} */}
=======
          </div>
        ): isMessageLoading?(<MessagesLoadingSkeleton/>) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullname} />
        )}
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        <MessageInput />
      </div>
    </>
  );
};

export default ChatContainer;
