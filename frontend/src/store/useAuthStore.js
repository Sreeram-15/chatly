import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
        authUser:null,
        isCheckingAuth:true,
        isSigningUp:false,

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
        }
    }))

