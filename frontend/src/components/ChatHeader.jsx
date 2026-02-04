import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
<<<<<<< HEAD
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const {onlineUsers}=useAuthStore();
  const isOnline=onlineUsers.includes(selectedUser._id);  

=======

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
    
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    useEffect(()=>{
        const handleEscKey=(event)=>{
            if(event.key==='Escape')setSelectedUser(null);
        };
        window.addEventListener('keydown',handleEscKey);

        return (()=>window.removeEventListener('keydown',handleEscKey));
    },[setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
        border-slate-700/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
<<<<<<< HEAD
        <div className={`avatar ${isOnline?"online":"offline"}`}>
=======
        <div className="avatar online">
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullname}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullname}
          </h3>
<<<<<<< HEAD
          <p className="text-slate-400 text-sm">{isOnline?"online":"offline"}</p>
=======
          <p className="text-slate-400 text-sm">online</p>
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
