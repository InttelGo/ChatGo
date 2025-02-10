import { Router } from "express";

import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
  getMessages,
  newMessage
} from "../controllers/message.controller.js";

const router = Router();

router.post("/message", authRequired, getMessages);
router.post("/newmessage/user", authRequired, newMessage);

export default router;
