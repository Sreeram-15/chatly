import {create} from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContacts: async (user) => {
    try {
      set({ isContactsLoading: true });
      const res = await axioInstance.get("/messages/contacts");
      // console.log(res.data);
      set({ allContacts: res.data.filteredUsers ?? [] });
    } catch (error) {
      // console.log("Error in getting all contacts frontend:",error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      set({ isContactsLoading: false });
    }
  },
  getMyChatPartners: async (user) => {
    try {
      set({ isChatsLoading: true });
      const res = await axioInstance.get("/messages/chats");
      // console.log(res.data);
      set({ chats: res.data });
    } catch (error) {
      // console.log("Error in getting all contacts frontend:",error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      set({ isChatsLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axioInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in fetching user messages in chat:-",error);
      toast.error(error?.response?.data?.message || "Something went Error");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
