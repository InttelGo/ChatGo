import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser"; // Minúscula en "cookie-parser"
import cors from "cors";
import { fileURLToPath } from "url";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import rolRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import redirectRoutes from "./routes/redirecction.routes.js"; // Asegurar el nombre correcto

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔹 Middlewares (orden correcto)
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(morgan("dev"));

// 🔹 Servir archivos estáticos desde "dist" para producción
app.use(express.static(path.join(__dirname, "../dist")));

// 🔹 Definir rutas correctamente con prefijos claros
app.use("/api/webhook", webhookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/redirects", redirectRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/users", userRoutes);

// 🔹 Servir index.html en la raíz para SPA (Single Page Application)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});


export default app;
