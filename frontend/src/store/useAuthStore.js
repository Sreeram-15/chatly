import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";
<<<<<<< HEAD
import {io} from "socket.io-client";

const BASE_URL=import.meta.env.MODE==='development'?"http://localhost:3000":"/";
export const useAuthStore = create((set,get) => ({
=======

export const useAuthStore = create((set) => ({
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isProfileUpdating: false,
<<<<<<< HEAD
  socket: null,
  onlineUsers:[],
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b

  checkAuth: async () => {
    try {
      const res = await axioInstance.get("/auth/check");
      set({ authUser: res.data });
<<<<<<< HEAD
      get().connectSocket();
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    } catch (error) {
      // console.log("Error in AuthCheck:",error);
      set({ authUser: null });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axioInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
<<<<<<< HEAD
      get().connectSocket();
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    } catch (error) {
      // console.log("Error in signingup:-",error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      // console.error("Signup failed:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axioInstance.post("/auth/login", data);
      set({ authUser: res.data });
<<<<<<< HEAD
      get().connectSocket();
      toast.success("Welcome Back");
      get().connectSocket();
=======
      toast.success("Welcome Back");
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    } catch (error) {
      // console.log("Error in signingup:-",error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      // console.error("Login failed:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (data) => {
    set({ isLoggingOut: true });
    try {
      const res = await axioInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
<<<<<<< HEAD
      get().disconnectSocket();
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
    } catch (error) {
      // console.log("Error in logging Out:",error);
      toast.error(
        error.response?.data?.message || "Logged out failed. Please try again."
      );
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isProfileUpdating: true });
    //   console.log("updating profile");
      const res = await axioInstance.put("/auth/update-profile", data);
    //   console.log("response recived successfully");
      set({ authUser: res.data });
      toast.success("Profile Updated successfully");
    } catch (error) {
        console.log("Error in updating profile:-",error);
      toast.error(
        error?.response?.data?.message ||
          "Profile update failed, Please try again later."
      );
    } finally {
      set({ isProfileUpdating: false });
    }
  },
<<<<<<< HEAD

  connectSocket:()=>{
    const {authUser}=get();
    if(!authUser||get().socket?.connected)return;
    // console.log(authUser);

    const socket=io(BASE_URL,{withCredentials:true});
    // console.log(socket);

    socket.connect();
    // console.log(socket);
    set({socket});

    //listen for online users event
    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers:userIds})
    })
  },

  disconnectSocket:()=>{
    console.log("disconnecting user socket");
    if(get().socket?.connected){
      // console.log("trying to disconnect user");
      get().socket.disconnect();
      // console.log("User disconnected successfully:-",get().socket.connected);
    }
  }
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
}));
