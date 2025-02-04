import { Router } from "express";

import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
  getMessages,
} from "../controllers/message.controller.js";

const router = Router();

router.post("/message", authRequired, getMessages);

export default router;
