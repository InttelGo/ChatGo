import { Router } from "express";

import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
  getAllConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";

const router = Router();

router.post("/", getAllConversation);
router.put("/update",authRequired, updateConversation);

export default router;
