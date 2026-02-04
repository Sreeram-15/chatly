import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatsFound from './NoChatFound';
import UserLoadingSkeleton from './UserLoadingSkeleton';
import { useAuthStore } from '../store/useAuthStore.js';

const ChatList = () => {
  const { onlineUsers } = useAuthStore();
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);
  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {
        chats.map((chat) => (
          <div
            key={chat._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20
            transition-colors"
            onClick={() => setSelectedUser(chat)}
          >
            <div className='flex items-center gap-3'>
              {/* TODO:- FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
              <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullname} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate' >{chat.fullname}</h4>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ChatList
