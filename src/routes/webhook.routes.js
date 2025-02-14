import express from "express";
import { newMessage } from "../controllers/conversation.controller.js";
const router = express.Router();
router.post('/', (res,req) => newMessage(req, res));

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    res.sendStatus(403);
  }
});

export default router;
