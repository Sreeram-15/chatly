import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router";

export const useAuthStore=create((set)=>({
        authUser:null,
        isCheckingAuth:true,
        isSigningUp:false,
        isLoggingIn:false,
        isLoggingOut:false,

        checkAuth:async ()=>{
            try {
                const res=await axioInstance.get("/auth/check");
                set({authUser:res.data});
            } catch (error) {
                console.log("Error in AuthCheck:",error);
                set({authUser:null});
            }finally{
                set({
                    isCheckingAuth:false
                });
            }
        },

        signup:async (data)=>{
            try {
                set({isSigningUp:true});
                const res=await axioInstance.post("/auth/signup",data);
                set({authUser:res.data});
                toast.success("Account created successfully");
            } catch (error) {
                // console.log("Error in signingup:-",error);
                toast.error(error.response?.data?.message || "Signup failed. Please try again.");
                console.error("Signup failed:", error);
            }finally{
                set({isSigningUp:false});
            }
        },
        
        login:async (data)=>{
            try {
                set({isLoggingIn:true});
                const res=await axioInstance.post("/auth/login",data);
                set({authUser:res.data});
                toast.success("Welcome Back");
            } catch (error) {
                // console.log("Error in signingup:-",error);
                toast.error(error.response?.data?.message || "Login failed. Please try again.");
                console.error("Login failed:", error);
            }finally{
                set({isLoggingIn:false});
            }
        },

        logout:async(data)=>{
            set({isLoggingOut:true});
            try {
                const res=await axioInstance.post("/auth/logout");
                set({authUser:null});
                toast.success("Logged out successfully");
                
            } catch (error) {
                console.log("Error in logging Out:",error);
                toast.error(error.response?.data?.message || "Logged out failed. Please try again.");
            }finally{
            set({isLoggingOut:false});
            }
        }
    }))

