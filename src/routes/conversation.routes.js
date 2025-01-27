import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
  sendMessage,
  getConversation,
} from "../controllers/conversation.controller.js";

const router = Router();

router.post("/send", authRequired, sendMessage);
router.post("/new/client", getConversation);

export default router;
