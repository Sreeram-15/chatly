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

const ChatPage = () => {
  const { logout, isLoggingOut } = useAuthStore();
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
          {activeTab==="chats"?<ChatPage/>:<ContactList/>}
        </div>
        {/* Right Side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser?<ChatContainer/>:<NoConversationPlaceHolder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};
// {/* <button className="auth-btn" onClick={getAllContacts}>
//           Contacts
//         </button>
//         ChatPage
//         <button className="auth-btn" type="submit" onClick={logout}> */}
//           {/* Logout */}
        //   {/* {isLoggingOut ? (
        //     <LoaderIcon className="w-full h-5 animate-spin text-center" />
        //   ) : (
        //     "Log Out"
        //   )}
        // </button> */}
export default ChatPage;
