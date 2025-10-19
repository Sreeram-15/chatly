import { Router } from "express";
import { login, Logout, signup, updateProfile } from "../controllers/autn.controller.js";
import { protectedRoute } from "../middleware/protectedroute.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router=Router();

router.use(arcjetProtection);

router.post("/signup",signup);

router.post("/login",arcjetProtection,login);

router.post("/logout",Logout);

router.put("/update-profile",protectedRoute,updateProfile);

router.get("/check",protectedRoute,(req,res)=>res.status(200).json(req.user))

export default router;