import { Router } from "express";
const router=Router();
router.get("/singnup",(req,res)=>{
    res.send("Signup endpoint");
})

router.get("/login",(req,res)=>{
    res.send("Login login");
})

router.get("/logout",(req,res)=>{
    res.send("Logout logout");
})

export default router;