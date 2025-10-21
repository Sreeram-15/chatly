import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";
import ChatList from "../components/ChatList";

const ChatPage = () => {
  const { allContacts, getAllContacts,activeTab,selectedUser, } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px] z-10">
      <BorderAnimatedContainer>
        {/* Left Side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab==="chats"?<ChatList/>:<ContactList/>}
        </div>
        {/* Right Side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser?<ChatContainer/>:<NoConversationPlaceHolder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};
export default ChatPage;
