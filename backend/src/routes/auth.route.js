import { Router } from "express";
import { login, Logout, signup, updateProfile } from "../controllers/autn.controller.js";
import { protectedRoute } from "../middleware/protectedroute.js";
const router=Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",Logout);

router.put("/update-profile",protectedRoute,updateProfile);

router.get("/check",protectedRoute,(req,res)=>res.status(200).json(req.user))

export default router;