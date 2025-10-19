import { Router } from "express";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/protectedroute.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router=Router();
router.use(arcjetProtection,protectedRoute);
router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",sendMessage);

export default router;