import { Router } from "express";
import { login, Logout, signup } from "../controllers/autn.controller.js";
const router=Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",Logout);

export default router;