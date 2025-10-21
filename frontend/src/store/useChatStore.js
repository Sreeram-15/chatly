import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled"),

  toggleSound:()=>{
    localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
    set({"isSoundEnabled":!get().isSoundEnabled})
  },

  setActiveTab:(tab)=>{set({activeTab:tab})},
  setSelectedUser:(user)=>{set({selectedUser:user})},

  getAllContacts:async (user)=>{
    try {
        set({isUsersLoading:true});
        const res=await axioInstance.get("/messages/contacts");
        // console.log(res.data);
        set({allContacts:res?.data?.filteredUsers});
    } catch (error) {
        // console.log("Error in getting all contacts frontend:",error);
        toast.error(res.response?.data?.message || "Internal Server Error");
    }finally{
        set({isUsersLoading:false});
    }
  },
  getMyChatPartners:(tab)=>{set({activeTab:tab})},

}));
