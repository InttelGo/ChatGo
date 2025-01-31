import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import rolRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import redirectRoutes from "./routes/redirecction.routes.js";
import { VERIFY_TOKEN } from "./config.js";
import cors from "cors";

const app = express();


// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*"); // Permitir cualquier origen
  },
  credentials: true, // Permitir envío de cookies
}));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
// Cookie parser middleware
app.use(CookieParser());

//RUTAS

//webhook
app
  .route("/webhook")
  .get((req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Verificar el token
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verificado correctamente.");
      res.status(200).send(challenge); // Responder con el hub.challenge
    } else {
      console.error("Error en la verificación del Webhook.");
      res.sendStatus(403); // Forbidden
    }
  })
  .post((req, res) => {
    const body = req.body;
    console.log("Evento recibido:", JSON.stringify(body, null, 2));

    res.status(200).send("Evento recibido");
  });

app.use("/", authRoutes);
app.use("/conversation", conversationRoutes);
app.use("/api", redirectRoutes);
app.use("/api", rolRoutes);
app.use("/api", userRoutes);
export default app;
