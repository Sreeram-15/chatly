import { Router } from "express";
import { login, Logout, signup } from "../controllers/autn.controller.js";
const router=Router();

router.post("/signup",signup);

router.get("/login",login);

router.get("/logout",Logout);

export default router;