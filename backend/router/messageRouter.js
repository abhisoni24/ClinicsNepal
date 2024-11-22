import express from "express";
import { isAdminAutheticated } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAutheticated, getMessages);

export default router;
