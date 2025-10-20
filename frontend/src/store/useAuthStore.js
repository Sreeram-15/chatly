import { create } from "zustand";

export const useAuthStore=create((set)=>({
        authUser:{name:"Ram"},
        isLoading:false,
        login:()=>{
            console.log("Logged In");
        }
    }))

