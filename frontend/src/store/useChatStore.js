import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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
      console.log("Error in fetching user messages in chat:-", error);
      toast.error(error?.response?.data?.message || "Something went Error");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser?._id) {
      toast.error("No recipient selected");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticMeassage = {
      _id: tempId,
      senderId: authUser._id,
      reciverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, //flag to identify optimistic messages
    };
    //immediately update the UI by adding the message
    set({ messages: [...messages, optimisticMeassage] });

    try {
      const res = await axioInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      //remove optimistic message on failure
      set({ messages: messages });
      console.log("Failed in sending messages:-", error);
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessages", (newMessage) => {
      const isMessageSentFromSelectedUser=selectedUser._id===newMessage.senderId;
      if(!isMessageSentFromSelectedUser)return;
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });

    if (isSoundEnabled) {
      const notificationSound = new Audio("/sounds/notification.mp3");
      notificationSound.currentTime = 0; //reset to start;
      notificationSound
        .play()
        .catch((error) =>
          console.log("error in playing notification sound:-", error)
        );
    }
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessages");
  },
}));
