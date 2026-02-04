import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import UserLoadingSkeleton from './UserLoadingSkeleton';
<<<<<<< HEAD
import { useAuthStore } from '../store/useAuthStore';

const ContactList = () => {
  const {getAllContacts, allContacts, isUsersLoading,setSelectedUser}=useChatStore();
  const {onlineUsers}=useAuthStore();
=======

const ContactList = () => {
  const {getAllContacts, allContacts, isUsersLoading,setSelectedUser}=useChatStore();
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
  useEffect(()=>{
    getAllContacts();
  },[getAllContacts]);
  // console.log(chats);
  if(isUsersLoading)return <UserLoadingSkeleton/>;

  return (
    <>
      {
        allContacts.map((contact)=>(
          <div 
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20
            transition-colors"
            onClick={()=>setSelectedUser(contact)}
          >
            <div className='flex items-center gap-3'>
              {/* TODO:- FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
<<<<<<< HEAD
              <div className={`avatar ${onlineUsers.includes(contact._id)?"online":"offline"}`}>
=======
              <div className={`avatar online`}>
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
                <div className='size-12 rounded-full'>
                  <img src={contact.profilePic||"/avatar.png"} alt={contact.fullname} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate' >{contact.fullname}</h4>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ContactList
