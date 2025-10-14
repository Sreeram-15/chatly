import { Router } from "express";

const router=Router();
router.get("/send",(req,res)=>{
    res.send("messages send End Point");
});
router.get("/recive",(req,res)=>{
    res.send("messages recive End Point");
});

export default router;