import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import webhookRoutes from './routes/webhook.routes.js';
import rolRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import redirectRoutes from "./routes/redirecction.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || "*"); // Permitir cualquier origen
    },
    credentials: true, // Permitir envío de cookies
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(CookieParser());

//webhook
app.use("/webhook", webhookRoutes);
app.use("/", authRoutes);
app.use("/conversation", conversationRoutes);
app.use("/conversation", messagesRoutes);
app.use("/api", redirectRoutes);
app.use("/api", rolRoutes);
app.use("/api", userRoutes);
export default app;
